import { Test, TestingModule } from '@nestjs/testing';
import { OrganismoController } from './organismo.controller';
import { OrganismoService } from './organismo.service';
import { createOrganismoDto, organismo } from '../test/test-data';

describe('OrganismoController', () => {
  let controller: OrganismoController;
  let service: OrganismoService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganismoController],
      providers: [
        {
          provide: OrganismoService,
          useValue:{
            findOne: jest.fn().mockResolvedValue(organismo),
            create: jest.fn().mockResolvedValue(organismo),
            findAll : jest.fn().mockResolvedValue([organismo]),
            update: jest.fn().mockResolvedValue(organismo),
          }
        }
      ],
    }).compile();
    service= module.get<OrganismoService>(OrganismoService);
    controller = module.get<OrganismoController>(OrganismoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new organismo', async () => {
      const result = await controller.create(createOrganismoDto);
      expect(result).toEqual(organismo);
      expect(service.create).toHaveBeenCalledWith(createOrganismoDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of organismos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([organismo]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single organismo', async () => {
      const result = await controller.findOne('some-uuid');
      expect(result).toEqual(organismo);
      expect(service.findOne).toHaveBeenCalledWith('some-uuid');
    });
  });

  describe('update', () => {
    it('should update an existing organismo', async () => {
      const result = await controller.update('some-uuid', createOrganismoDto);
      expect(result).toEqual(organismo);
      expect(service.update).toHaveBeenCalledWith('some-uuid', createOrganismoDto);
    });
  });
});
