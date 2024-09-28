import { Test, TestingModule } from '@nestjs/testing';
import { OperadorController } from './operador.controller';
import { OperadorService } from './operador.service';
import { createOperadorDto, operador } from '../test/test-data';

describe('OperadorController', () => {
  let controller: OperadorController;
  let service: OperadorService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperadorController],
      providers: [
        {
          provide: OperadorService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(operador),
            create: jest.fn().mockResolvedValue(operador),
            findAll: jest.fn().mockResolvedValue([operador]),
            update: jest.fn().mockResolvedValue(operador),
            getCorreo: jest.fn().mockResolvedValue(operador.nombre),
          },
        },
      ],
    }).compile();
    service = module.get<OperadorService>(OperadorService);
    controller = module.get<OperadorController>(OperadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new operador', async () => {
      const result = await controller.create(createOperadorDto);
      expect(result).toEqual(operador);
      expect(service.create).toHaveBeenCalledWith(createOperadorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of operadores', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([operador]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single operador', async () => {
      const result = await controller.findOne('some-uuid');
      expect(result).toEqual(operador);
      expect(service.findOne).toHaveBeenCalledWith('some-uuid');
    });
  });
  describe('getCorreo', () => {
    it('should return the name of an operador', async () => {
      const result = await controller.getCorreo(operador.correo);
      expect(result).toEqual(operador.nombre);
      expect(service.getCorreo).toHaveBeenCalledWith(operador.correo);
    });
  });
  describe('update', () => {
    it('should update an existing operador', async () => {
      const result = await controller.update('some-uuid', createOperadorDto);
      expect(result).toEqual(operador);
      expect(service.update).toHaveBeenCalledWith(
        'some-uuid',
        createOperadorDto
      );
    });
  });
});
