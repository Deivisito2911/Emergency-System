import { Test, TestingModule } from '@nestjs/testing';
import { AfectadoController } from './afectado.controller';
import { AfectadoService } from './afectado.service';
import { createAfectadoDto, afectado } from '../test/test-data';

describe('AfectadoController', () => {
  let controller: AfectadoController;
  let service: AfectadoService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfectadoController],
      providers: [
        {
          provide: AfectadoService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(afectado),
            create: jest.fn().mockResolvedValue(afectado),
            findAll: jest.fn().mockResolvedValue([afectado]),
            update: jest.fn().mockResolvedValue(afectado),
          },
        },
      ],
    }).compile();

    controller = module.get<AfectadoController>(AfectadoController);
    service = module.get<AfectadoService>(AfectadoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of afectados', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([afectado]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single afectado', async () => {
      const result = await controller.findOne('some-uuid');
      expect(result).toEqual(afectado);
      expect(service.findOne).toHaveBeenCalledWith('some-uuid');
    });
  });

  describe('update', () => {
    it('should update an existing afectado', async () => {
      const result = await controller.update('some-uuid', createAfectadoDto);
      expect(result).toEqual(afectado);
      expect(service.update).toHaveBeenCalledWith(
        'some-uuid',
        createAfectadoDto
      );
    });
  });
});
