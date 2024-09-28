import { Test, TestingModule } from '@nestjs/testing';
import { DenuncianteService } from './denunciante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Denunciante } from './denunciante.entity';
import {  createDenuncianteDto, denunciante, incidencia } from '../test/test-data';
import { NotFoundException } from '@nestjs/common';


describe('DenuncianteService', () => {
  let service: DenuncianteService;
  let repository: Repository<Denunciante>;
  const denuncianteId = 'denunciante-1234';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DenuncianteService,
        {
          provide: getRepositoryToken(Denunciante),
          useValue: {
            findOneBy: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DenuncianteService>(DenuncianteService);
    repository = module.get<Repository<Denunciante>>(getRepositoryToken(Denunciante));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the Denunciante object if it exists', async () => {
      jest.spyOn(service, 'comprobarExistencia').mockResolvedValueOnce(denunciante);
      const result = await service.findOne(denuncianteId);
      expect(service.comprobarExistencia).toHaveBeenCalledWith( denuncianteId );
      expect(result).toEqual(denunciante);
    });
  });

  describe('findAll', () => {
    it('should find all denunciantes', async () => {
      const denunciantes = [denunciante];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(denunciantes);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(denunciantes);
    });
  });

  describe('update', () => {
    it('should update an existing Afectado', async () => {
      const updateDenuncianteDto= createDenuncianteDto;

      const existingDenunciante = denunciante;

      jest
        .spyOn(service, 'comprobarExistencia')
        .mockResolvedValueOnce(existingDenunciante);
        const merge = jest.spyOn(repository, 'merge').mockImplementation((existing, update) => {
          return { ...existing, ...update } as any;
        });
        const save = jest.spyOn(repository, 'save').mockResolvedValueOnce(
          { ...existingDenunciante, 
            ...updateDenuncianteDto 
          });
        const result = await service.update(denuncianteId, updateDenuncianteDto);
        expect(service.comprobarExistencia).toHaveBeenCalledWith(denuncianteId);
        expect(merge).toHaveBeenCalledWith(existingDenunciante, updateDenuncianteDto);
        expect(save).toHaveBeenCalledWith({ ...existingDenunciante, ...updateDenuncianteDto });
        expect(result).toEqual({ ...existingDenunciante, ...updateDenuncianteDto });
    });

    it('should throw error if the Denunciante does not exist', async () => {
      const updateDenuncianteDto= createDenuncianteDto;

      jest.spyOn(service, 'comprobarExistencia').mockImplementation(async () => {
        throw new NotFoundException(`Denunciante no registrado`);
      });
      const merge = jest.spyOn(repository, 'merge');
      const save = jest.spyOn(repository, 'save');
  
      await expect(service.update(denuncianteId, updateDenuncianteDto)).rejects.toThrow(
        new NotFoundException(`Denunciante no registrado`));
      expect(service.comprobarExistencia).toHaveBeenCalledWith(denuncianteId);
      expect(merge).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new Denunciante', async () => {

      jest.spyOn(repository, 'create').mockReturnValue(denunciante);
      jest.spyOn(repository, 'save').mockResolvedValue(denunciante);

      const result = await service.create(createDenuncianteDto, incidencia);

      expect(repository.create).toHaveBeenCalledWith(createDenuncianteDto);
      expect(repository.save).toHaveBeenCalledWith(denunciante);
      expect(result).toEqual(denunciante);
    });
  });
  it('should throw NotFoundException if denunciante with given codigo does not exist', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

    try {
      await service.comprobarExistencia(denuncianteId);
      expect(true).toBe(false); 
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual('Denunciante no registrado');
    }
  });
});
