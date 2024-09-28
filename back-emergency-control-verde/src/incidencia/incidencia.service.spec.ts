import { Test, TestingModule } from '@nestjs/testing';
import { IncidenciaService } from './incidencia.service';
import { Incidencia } from './incidencia.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { CreateAfectadoDto } from '../afectado/dto/create-afectado.dto';
import { Afectado } from '../afectado/afectado.entity';
import { incidencia, afectado, denunciante, operador, createIncidenciaDto } from '../test/test-data';
import { OperadorService } from '../operador/operador.service';
import { AfectadoService } from '../afectado/afectado.service';
import { DenuncianteService } from '../denunciante/denunciante.service';
import { LogsService } from '../logs/logs.service';
import { mapCreateAfectadoDtoToAfectado , removeCircularReferences } from '../test/test-data';
import { Denunciante } from '../denunciante/denunciante.entity';
import { EmailService } from '../email/email.service';
import { NotFoundException } from '@nestjs/common';

describe('IncidenciaService', () => {
  let service: IncidenciaService;
  let repository: Repository<Incidencia>;
  let emailService : EmailService;
  let logService: LogsService;
  const incidenciaCodigo = 'uuid-1234';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncidenciaService,
        {
          provide: getRepositoryToken(Incidencia),
          useValue: {
            findOneBy: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: OperadorService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: AfectadoService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: DenuncianteService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: LogsService,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
          }, 
        },
        {
          provide: EmailService,
          useValue: {
            sendEmail: jest.fn(),
            notifyOrganismo: jest.fn(),
          },
        }
      ],
    }).compile();
    logService = module.get<LogsService>(LogsService);    
    emailService = module.get<EmailService>(EmailService);
    service = module.get<IncidenciaService>(IncidenciaService);
    repository = module.get<Repository<Incidencia>>(
      getRepositoryToken(Incidencia)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    it('should return the Incidencia object if it exists', async () => {
      jest.spyOn(service, 'comprobarExistencia').mockResolvedValueOnce(incidencia);
      const result = await service.findOne(incidenciaCodigo);
      expect(service.comprobarExistencia).toHaveBeenCalledWith( incidenciaCodigo );
      expect(result).toEqual(incidencia);
    });
  });

  describe('findAll', () => {
    it('should find all incidencias', async () => {
      const incidencias = [incidencia];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(incidencias);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(incidencias);
    });
  });
  describe('create', () => {
    it('should create a new Incidencia', async () => {

      jest.spyOn(repository, 'create').mockReturnValue(incidencia);
      jest.spyOn(repository, 'save').mockResolvedValue(incidencia);
      
      jest.spyOn(emailService, 'notifyOrganismo').mockImplementation(jest.fn());

      const result = await service.create(createIncidenciaDto);

      expect(repository.create).toHaveBeenCalledWith(createIncidenciaDto);
      expect(repository.save).toHaveBeenCalledWith(incidencia);
      expect(result).toEqual(incidencia);
      expect(emailService.notifyOrganismo).toHaveBeenCalledWith(incidencia.tipo, incidencia);
    });
  });
  describe('update', () => {
    it('should update an existing Operador', async () => {
      const updateIncidenciaDto= createIncidenciaDto;
      const existingIncidencia = incidencia;

      jest
        .spyOn(service, 'comprobarExistencia')
        .mockResolvedValueOnce(existingIncidencia);
        const merge = jest.spyOn(repository, 'merge').mockImplementation((existing, update) => {
          return { 
            ...existing, 
            ...update, 
            afectados: updateIncidenciaDto.afectados.map((dto) =>
              mapCreateAfectadoDtoToAfectado(dto, incidencia)
            ),
            denunciante : {
              ...denunciante,
              incidencia: existingIncidencia,
            } as Denunciante,
          } as any;
        });
        const save = jest.spyOn(repository, 'save').mockResolvedValueOnce(
          { ...existingIncidencia, 
            ...updateIncidenciaDto,
            afectados: updateIncidenciaDto.afectados.map((dto) =>
              mapCreateAfectadoDtoToAfectado(dto, incidencia)
            ),
            denunciante : {
              ...denunciante,
              incidencia: existingIncidencia,
            } as Denunciante,
          });
        const result = await service.update(incidenciaCodigo, updateIncidenciaDto);
        expect(service.comprobarExistencia).toHaveBeenCalledWith(incidenciaCodigo);
        expect(merge).toHaveBeenCalledWith(existingIncidencia, updateIncidenciaDto);
        expect(save).toHaveBeenCalledWith({
           ...existingIncidencia, 
           ...updateIncidenciaDto,
           afectados: updateIncidenciaDto.afectados.map((dto) =>
            mapCreateAfectadoDtoToAfectado(dto, incidencia)
          ),
          denunciante : {
            ...denunciante,
            incidencia: existingIncidencia,
          } as Denunciante,
          });
        expect(result).toEqual({ 
          ...existingIncidencia, 
          ...updateIncidenciaDto,
          afectados: updateIncidenciaDto.afectados.map((dto) =>
            mapCreateAfectadoDtoToAfectado(dto, incidencia)
          ),
          denunciante : {
            ...denunciante,
            incidencia: existingIncidencia,
          } as Denunciante,
         });
    });

    it('should throw error if the Incidencia does not exist', async () => {
      const codigo = incidenciaCodigo;
      const updateIncidenciaDto: UpdateIncidenciaDto = {
        codigo,
        tipo: 'tipo de incidencia',
        lugar: 'lugar de incidencia',
        cantidad_afectados: 1,
        descripcion: 'Descripción de la incidencia',
        afectados: [afectado],
        denunciante: denunciante,
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(undefined);

      await expect(service.update(codigo, updateIncidenciaDto)).rejects.toThrow(
        new Error('Incidencia no registrada')
      );

      expect(repository.findOneBy).toHaveBeenCalledWith({ codigo });
      expect(repository.merge).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });
  it('should throw NotFoundException if incidencia with given codigo does not exist', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

    try {
      await service.comprobarExistencia(incidenciaCodigo);
      expect(true).toBe(false); 
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual('Incidencia no registrada');
      expect(logService.error).toHaveBeenCalledWith(error); 
    }
  });
});

