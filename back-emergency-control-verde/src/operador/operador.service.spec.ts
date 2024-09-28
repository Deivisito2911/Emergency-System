import { Test, TestingModule } from '@nestjs/testing';
import { OperadorService } from './operador.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operador } from './operador.entity';
import { createOperadorDto, operador } from '../test/test-data';
import { NotFoundException } from '@nestjs/common';
import { LogsService } from '../logs/logs.service';

describe('OperadorService', () => {
  let service: OperadorService;
  let repository: Repository<Operador>;
  let logService: LogsService;
  const operadorCedula = '31443201';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperadorService,
        {
          provide: getRepositoryToken(Operador),
          useValue: {
            findOneBy: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            create: jest.fn(),
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
      ],
    }).compile();

    logService = module.get<LogsService>(LogsService);
    service = module.get<OperadorService>(OperadorService);
    repository = module.get<Repository<Operador>>(getRepositoryToken(Operador));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the Operador object if it exists', async () => {
      jest
        .spyOn(service, 'comprobarExistencia')
        .mockResolvedValueOnce(operador);
      const result = await service.findOne(operadorCedula);
      expect(service.comprobarExistencia).toHaveBeenCalledWith({
        cedula: operadorCedula,
      });
      expect(result).toEqual(operador);
    });
  });
  describe('getCorreo', () => {
    it('should return the name of an Operator if it exists', async () => {
      jest
        .spyOn(service, 'comprobarExistencia')
        .mockResolvedValueOnce(operador);
      const result = await service.getCorreo(operador.correo);
      expect(service.comprobarExistencia).toHaveBeenCalledWith({
        correo: operador.correo,
      });
      expect(result).toEqual(operador.nombre);
    });
  });
  describe('findAll', () => {
    it('should find all operadores', async () => {
      const operadores = [operador];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(operadores);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(operadores);
    });
  });

  describe('update', () => {
    it('should update an existing Operador', async () => {
      const updateOperadorDto = createOperadorDto;
      const existingOperador = operador;

      jest
        .spyOn(service, 'comprobarExistencia')
        .mockResolvedValueOnce(existingOperador);
      const merge = jest
        .spyOn(repository, 'merge')
        .mockImplementation((existing, update) => {
          return { ...existing, ...update } as any;
        });
      const save = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce({ ...existingOperador, ...updateOperadorDto });
      const result = await service.update(operadorCedula, updateOperadorDto);
      expect(service.comprobarExistencia).toHaveBeenCalledWith({
        cedula: operadorCedula,
      });
      expect(merge).toHaveBeenCalledWith(existingOperador, updateOperadorDto);
      expect(save).toHaveBeenCalledWith({
        ...existingOperador,
        ...updateOperadorDto,
      });
      expect(result).toEqual({ ...existingOperador, ...updateOperadorDto });
    });

    it('should throw error if the Operador does not exist', async () => {
      const updateOperadorDto = createOperadorDto;

      jest
        .spyOn(service, 'comprobarExistencia')
        .mockImplementation(async () => {
          throw new NotFoundException(`Operador no registrado`);
        });
      const merge = jest.spyOn(repository, 'merge');
      const save = jest.spyOn(repository, 'save');

      await expect(
        service.update(operadorCedula, updateOperadorDto)
      ).rejects.toThrow(new NotFoundException(`Operador no registrado`));
      expect(service.comprobarExistencia).toHaveBeenCalledWith({
        cedula: operadorCedula,
      });
      expect(merge).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
    });
  });
  describe('create', () => {
    it('should create a new Operador', async () => {
      jest.spyOn(repository, 'create').mockReturnValue(operador);
      jest.spyOn(repository, 'save').mockResolvedValue(operador);

      const result = await service.create(createOperadorDto);

      expect(repository.create).toHaveBeenCalledWith(createOperadorDto);
      expect(repository.save).toHaveBeenCalledWith(operador);
      expect(result).toEqual(operador);
    });
  });
  describe('comprobarExistencia', () => {
    it('should throw NotFoundException if incidencia with given value for the given parameter does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      try {
        await service.comprobarExistencia({ cedula: operadorCedula });
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Operador no registrado');
        expect(logService.error).toHaveBeenCalledWith(error);
      }
    });
  });
});
