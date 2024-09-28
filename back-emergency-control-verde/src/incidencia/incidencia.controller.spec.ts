import { Test, TestingModule } from '@nestjs/testing';
import { IncidenciaController } from './incidencia.controller';
import { IncidenciaService } from './incidencia.service';
import {
  incidencia,
  createIncidenciaDto,
  denunciante,
} from '../test/test-data';
import { NotFoundException } from '@nestjs/common';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { EmailService } from '../email/email.service';
import { LogsService } from '../logs/logs.service';
import { mapCreateAfectadoDtoToAfectado } from '../test/test-data';

describe('IncidenciaController', () => {
  let controller: IncidenciaController;
  let service: IncidenciaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncidenciaController],
      providers: [
        {
          provide: IncidenciaService,
          useValue: {
            create: jest.fn().mockReturnValue(incidencia),
            findOne: jest.fn().mockReturnValue(incidencia),
            update: jest.fn().mockReturnValue(incidencia),
            findAll: jest.fn().mockReturnValue([incidencia]),
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
    service = module.get<IncidenciaService>(IncidenciaService);
    controller = module.get<IncidenciaController>(IncidenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new incidencia', async () => {
      const result = await controller.create(createIncidenciaDto);
      expect(result).toEqual(incidencia);
      expect(service.create).toHaveBeenCalledWith(createIncidenciaDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of incidencia', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([incidencia]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single incidencia', async () => {
      const result = await controller.findOne('some-uuid');
      expect(result).toEqual(incidencia);
      expect(service.findOne).toHaveBeenCalledWith('some-uuid');
    });

    it('should throw NotFoundException when findOne throws an error', async () => {
      const codigo = 'invalid-uuid';

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new NotFoundException('RECURSO NO ENCONTRADO'));

      await expect(controller.findOne(codigo)).rejects.toThrowError(
        NotFoundException
      );
      expect(service.findOne).toHaveBeenCalledWith(codigo);
    });
  });

  describe('update', () => {
    it('should update an incidencia when update is successful', async () => {
      const codigo = 'uuid-1234';
      const updateDto: UpdateIncidenciaDto = {
        codigo,
        tipo: 'tipo de incidencia',
        lugar: 'lugar de incidencia',
        cantidad_afectados: 1,
        descripcion: 'Descripción de la incidencia',
        afectados: [],
        denunciante: denunciante,
      };
      const updatedIncidencia = {
        ...incidencia,
        ...updateDto,
        afectados: updateDto.afectados.map((dto) =>
          mapCreateAfectadoDtoToAfectado(dto, incidencia)
        ),
        denunciante,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedIncidencia);

      const result = await controller.update(codigo, updateDto);

      expect(result).toEqual(updatedIncidencia);
      expect(service.update).toHaveBeenCalledWith(codigo, updateDto);
    });

    it('should throw NotFoundException when update throws an error', async () => {
      const codigo = 'invalid-uuid';
      const updateDto: UpdateIncidenciaDto = {
        codigo,
        tipo: 'tipo de incidencia',
        lugar: 'lugar de incidencia',
        cantidad_afectados: 1,
        descripcion: 'Descripción de la incidencia',
        afectados: [],
        denunciante: denunciante,
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('Not found'));

      await expect(controller.update(codigo, updateDto)).rejects.toThrowError(
        NotFoundException
      );
      expect(service.update).toHaveBeenCalledWith(codigo, updateDto);
    });
  });
});
