import { Test, TestingModule } from '@nestjs/testing';
import { OrganismoService } from './organismo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organismo } from './organismo.entity';
import { createOrganismoDto, organismo} from '../test/test-data';
import { NotFoundException } from '@nestjs/common';

describe('OrganismoService', () => {
  let service: OrganismoService;
  let repository: Repository<Organismo>;
  const organismoCodigo = 'uuid-1234';


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganismoService,
        {
          provide: getRepositoryToken(Organismo),
          useValue: {
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            find: jest.fn(),
            softDelete: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrganismoService>(OrganismoService);
    repository = module.get<Repository<Organismo>>(
      getRepositoryToken(Organismo)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the Organismo object if it exists', async () => {
      jest.spyOn(service, 'comprobarExistencia').mockResolvedValueOnce(organismo);
      const result = await service.findOne(organismoCodigo);
      expect(service.comprobarExistencia).toHaveBeenCalledWith( organismoCodigo );
      expect(result).toEqual(organismo);
    });
  });

  describe('findAll', () => {
    it('should find all Organismos', async () => {
      const organismos = [organismo];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(organismos);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(organismos);
    });
  });

  describe('update', () => {
    it('should update an existing Organismo', async () => {
      const updateOrganismoDto= createOrganismoDto;
      const existingOrganismo = organismo;

      jest
        .spyOn(service, 'comprobarExistencia')
        .mockResolvedValueOnce(existingOrganismo);
        const merge = jest.spyOn(repository, 'merge').mockImplementation((existing, update) => {
          return { ...existing, ...update } as any;
        });
        const save = jest.spyOn(repository, 'save').mockResolvedValueOnce(
          { ...existingOrganismo, 
            ...updateOrganismoDto 
          });
        const result = await service.update(organismoCodigo, updateOrganismoDto);
        expect(service.comprobarExistencia).toHaveBeenCalledWith(organismoCodigo);
        expect(merge).toHaveBeenCalledWith(existingOrganismo, updateOrganismoDto);
        expect(save).toHaveBeenCalledWith({ ...existingOrganismo, ...updateOrganismoDto });
        expect(result).toEqual({ ...existingOrganismo, ...updateOrganismoDto });
    });

    it('should throw error if the Organismo does not exist', async () => {
      const updateOrganismoDto= createOrganismoDto;

      jest.spyOn(service, 'comprobarExistencia').mockImplementation(async () => {
        throw new NotFoundException(`Organismo no registrado`);
      });
      const merge = jest.spyOn(repository, 'merge');
      const save = jest.spyOn(repository, 'save');
  
      await expect(service.update(organismoCodigo, updateOrganismoDto)).rejects.toThrow(
        new NotFoundException(`Organismo no registrado`));
      expect(service.comprobarExistencia).toHaveBeenCalledWith(organismoCodigo);
      expect(merge).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new Organismo', async () => {
      const createOrganismo= createOrganismoDto;

      jest.spyOn(repository, 'create').mockReturnValue(organismo);
      jest.spyOn(repository, 'save').mockResolvedValue(organismo);

      const result = await service.create(createOrganismoDto);

      expect(repository.create).toHaveBeenCalledWith(createOrganismoDto);
      expect(repository.save).toHaveBeenCalledWith(organismo);
      expect(result).toEqual(organismo);
    });
  });
  it('should throw NotFoundException if organismo with given codigo does not exist', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

    try {
      await service.comprobarExistencia(organismoCodigo);
      expect(true).toBe(false); 
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual('Organismo no registrado');
    }
  });
});
