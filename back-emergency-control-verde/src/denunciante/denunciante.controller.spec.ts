import { Test, TestingModule } from '@nestjs/testing';
import { DenuncianteController } from './denunciante.controller';
import { DenuncianteService } from './denunciante.service';
import { createDenuncianteDto, denunciante } from '../test/test-data';

describe('DenuncianteController', () => {
  let controller: DenuncianteController;
  let service: DenuncianteService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DenuncianteController],
      providers:[
        {
          provide: DenuncianteService,
          useValue:{
            findOne : jest.fn().mockResolvedValue(denunciante),
            update : jest.fn().mockResolvedValue(denunciante)
          }
        }
      ]
    }).compile();
    service= module.get<DenuncianteService>(DenuncianteService)
    controller = module.get<DenuncianteController>(DenuncianteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a single denunciante', async () => {
      const result = await controller.findOne('some-uuid');
      expect(result).toEqual(denunciante);
      expect(service.findOne).toHaveBeenCalledWith('some-uuid');
    });
  });

  describe('update', () => {
    it('should update an existing denunciante', async () => {
      const result = await controller.update('some-uuid', createDenuncianteDto);
      expect(result).toEqual(denunciante);
      expect(service.update).toHaveBeenCalledWith('some-uuid', createDenuncianteDto);
    });
  });
});
