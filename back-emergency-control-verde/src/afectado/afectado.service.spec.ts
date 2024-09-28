import { Test, TestingModule } from '@nestjs/testing';
import { AfectadoService } from './afectado.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Afectado } from './afectado.entity';
import { afectado, createAfectadoDto } from '../test/test-data';
import { NotFoundException } from '@nestjs/common';

describe('AfectadoService', () => {
  let service: AfectadoService;
  let repository: Repository<Afectado>;
  const afectadoId = 'uuid-1234';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AfectadoService,
        {
          provide: getRepositoryToken(Afectado),
          useValue: {
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

    service = module.get<AfectadoService>(AfectadoService);
    repository = module.get<Repository<Afectado>>(getRepositoryToken(Afectado));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the Afectado object if it exists', async () => {
      jest.spyOn(service, 'comprobarExistencia').mockResolvedValueOnce(afectado);
      const result = await service.findOne(afectadoId);
      expect(service.comprobarExistencia).toHaveBeenCalledWith( afectadoId );
      expect(result).toEqual(afectado);
    });
  });

  describe('findAll', () => {
    it('should find all afectados', async () => {
      const afectados = [afectado];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(afectados);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(afectados);
    });
  });

  describe('update', () => {
    it('should update an existing Afectado', async () => {
      const updateAfectadoDto = createAfectadoDto;
      const existingAfectado= afectado;
      const updatedAfectado: Afectado = {
        ...existingAfectado,
        ...updateAfectadoDto,
      };

      jest
        .spyOn(service, 'comprobarExistencia')
        .mockResolvedValueOnce(existingAfectado);
      jest.spyOn(repository, 'merge').mockReturnValue(updatedAfectado);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedAfectado);

      const result = await service.update(afectadoId, updateAfectadoDto);

      expect(service.comprobarExistencia).toHaveBeenCalledWith(afectadoId);
      expect(repository.merge).toHaveBeenCalledWith(
        existingAfectado,
        updateAfectadoDto
      );
      expect(repository.save).toHaveBeenCalledWith(updatedAfectado);
      expect(result).toEqual(updatedAfectado);
    });

    it('should throw error if the Afectado does not exist', async () => {
      const updateAfectadoDto= createAfectadoDto;

      jest.spyOn(service, 'comprobarExistencia').mockImplementation(async () => {
        throw new NotFoundException(`Afectado no registrado`);
      });
      const merge = jest.spyOn(repository, 'merge');
      const save = jest.spyOn(repository, 'save');
  
      await expect(service.update(afectadoId, updateAfectadoDto)).rejects.toThrow(
        new NotFoundException(`Afectado no registrado`));
      expect(service.comprobarExistencia).toHaveBeenCalledWith(afectadoId);
      expect(merge).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should call softDelete if the afectado exists', async () => {
      jest.spyOn(service, 'comprobarExistencia').mockResolvedValueOnce(afectado);

      await service.remove(afectadoId);

      expect(service.comprobarExistencia).toHaveBeenCalledWith(afectadoId);
      expect(repository.softDelete).toHaveBeenCalledWith(afectadoId);
    });

    it('should throw Error if the afectado does not exist', async () => {
      jest.spyOn(service, 'comprobarExistencia').mockImplementation(async () => {
        throw new NotFoundException(`Afectado no registrado`);
      });
      const softDelete = jest.spyOn(repository, 'softDelete').mockResolvedValueOnce(undefined);
  
      await expect(service.remove(afectadoId)).rejects.toThrow(new NotFoundException(`Afectado no registrado`));
      expect(service.comprobarExistencia).toHaveBeenCalledWith(afectadoId);
      expect(softDelete).not.toHaveBeenCalled();
    });
  });
  describe('create', () => {
    it('should create a new Afectado', async () => {

      jest.spyOn(repository, 'create').mockReturnValue(afectado);
      jest.spyOn(repository, 'save').mockResolvedValue(afectado);

      const result = await service.create(createAfectadoDto);

      expect(repository.create).toHaveBeenCalledWith(createAfectadoDto);
      expect(repository.save).toHaveBeenCalledWith(afectado);
      expect(result).toEqual(afectado);
    });
  });
  it('should throw NotFoundException if afectado with given codigo does not exist', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
    try {
      await service.comprobarExistencia(afectadoId);
      expect(true).toBe(false); 
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual('Afectado no registrado');
    }
  });
});
