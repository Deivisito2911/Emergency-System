import { Test, TestingModule } from '@nestjs/testing';
import { EmbarcacionService } from './embarcacion.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Embarcacion } from './embarcacion.entity';
import { CreateEmbarcacionDto } from './dto/create-embarcacion.dto';
import { UpdateEmbarcacionDto } from './dto/update-embarcacion.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('EmbarcacionService', () => {
  let service: EmbarcacionService;
  let repository: Repository<Embarcacion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmbarcacionService,
        {
          provide: getRepositoryToken(Embarcacion),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EmbarcacionService>(EmbarcacionService);
    repository = module.get<Repository<Embarcacion>>(
      getRepositoryToken(Embarcacion)
    );
  });

  it('deberia estar definida', () => {
    expect(service).toBeDefined();
  });

  describe('gets', () => {
    it('Deberia retornar todas las embarcaciones', async () => {
      const fecha_fabricacion2 = '2009-08-25';
      const fecha_fabricacion = '2024-06-07';
      const expectedEmbarcaciones: Embarcacion[] = [
        {
          id: '282e160f-5643-47f2-8c91-c1ec2cee1da7',
          nombre: 'Nueva Titanic',
          tipo_embarcacion: '',
          tipo_material: '',
          capacidad_maxima: 123,
          peso_embarcacion: 121,
          fecha_fabricacion: new Date(fecha_fabricacion),
          cantidad_motor: 45,
          reportes: []
        },
        {
          id: '3c86d9d9-aebb-4907-b25f-462955a306b0',
          nombre: 'Titanic',
          tipo_embarcacion: 'Crucero',
          tipo_material: 'Hierro',
          capacidad_maxima: 1000,
          peso_embarcacion: 650,
          fecha_fabricacion: new Date(fecha_fabricacion2),
          cantidad_motor: 3,
          reportes: []
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(expectedEmbarcaciones);

      expect(await service.gets()).toEqual(expectedEmbarcaciones);
    });
  });

  describe('getByUUID', () => {
    it('deberia retornar una embarcacion por un UUID', async () => {
      const fecha_fabricacion = '2009-08-25';
      const uuid = '3c86d9d9-aebb-4907-b25f-462955a306b0';

      const expectedEmbarcacion: Embarcacion = {
        id: uuid,
        nombre: 'Titanic',
        tipo_embarcacion: 'Carga Pesada',
        tipo_material: 'Hierro',
        capacidad_maxima: 1000,
        peso_embarcacion: 650,
        fecha_fabricacion: new Date(fecha_fabricacion),
        cantidad_motor: 3,
        reportes: []
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedEmbarcacion);

      expect(await service.getByUUID(uuid)).toBe(expectedEmbarcacion);
    });

    it('should throw HttpException when embarcacion is not found', async () => {
      const uuid = '3c86d9d9-aebb-4907-b25f-462955a306b0';

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      try {
        await service.getByUUID(uuid);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('la embarcacion no existe!!');
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('create', () => {
    it('deberia crear una nueva embarcacion', async () => {
      const fecha_fabricacionCreate = '2009-08-25';
      const embarcacionDto: CreateEmbarcacionDto = {
        id: '3c86d9d9-aebb-4907-b25f-462955a306b0',
        nombre: 'Nombre de la embarcacion',
        tipo_embarcacion: 'Tipo de embarcacion',
        tipo_material: 'Tipo de Material',
        capacidad_maxima: 158,
        peso_embarcacion: 451,
        fecha_fabricacion: new Date(fecha_fabricacionCreate),
        cantidad_motor: 3,
      };
      const result: Embarcacion = {
        id: embarcacionDto.id,
        nombre: embarcacionDto.nombre,
        tipo_embarcacion: embarcacionDto.tipo_embarcacion,
        tipo_material: embarcacionDto.tipo_material,
        capacidad_maxima: embarcacionDto.capacidad_maxima,
        peso_embarcacion: embarcacionDto.peso_embarcacion,
        fecha_fabricacion: embarcacionDto.fecha_fabricacion,
        cantidad_motor: embarcacionDto.cantidad_motor,
        reportes: []
      };

      jest.spyOn(repository, 'create').mockImplementation(() => result);
      jest.spyOn(repository, 'save').mockResolvedValue(result);

      expect(await service.create(embarcacionDto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('deberia actualizar una embarcacion existente', async () => {
      const fecha_fabricacionUpdate = '2009-08-25';
      const uuid = '3c86d9d9-aebb-4907-b25f-462955a306b0'; // ID de la embarcacion existente
      const updatedEmbarcacionDto: UpdateEmbarcacionDto = {
        nombre: 'Titanic', // Cambios que deseas aplicar
        tipo_embarcacion: 'Crucero',
        tipo_material: 'Hierro',
        capacidad_maxima: 1000,
        peso_embarcacion: 650,
        fecha_fabricacion: new Date(fecha_fabricacionUpdate),
        cantidad_motor: 3,
      };

      const existingEmbarcacion: Embarcacion = {
        id: uuid,
        nombre: updatedEmbarcacionDto.nombre,
        tipo_embarcacion: updatedEmbarcacionDto.tipo_embarcacion,
        tipo_material: updatedEmbarcacionDto.tipo_material,
        capacidad_maxima: updatedEmbarcacionDto.capacidad_maxima,
        peso_embarcacion: updatedEmbarcacionDto.peso_embarcacion,
        fecha_fabricacion: updatedEmbarcacionDto.fecha_fabricacion,
        cantidad_motor: updatedEmbarcacionDto.cantidad_motor,
        reportes: []
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingEmbarcacion);
      jest.spyOn(repository, 'save').mockResolvedValue(existingEmbarcacion);

      expect(await service.update(uuid, updatedEmbarcacionDto)).toEqual(
        existingEmbarcacion
      );
    });

    describe('delete', () => {
      it('deberia eliminar una embarcacion existente', async () => {
        const fecha_fabricacionDelete = '2009-08-25';
        const uuid = '3c86d9d9-aebb-4907-b25f-462955a306b0'; // ID de la embarcacion existente
        const existingEmbarcacion: Embarcacion = {
          id: uuid,
          nombre: 'Titanic',
          tipo_embarcacion: 'Crucero',
          tipo_material: 'Hierro',
          capacidad_maxima: 1000,
          peso_embarcacion: 650,
          fecha_fabricacion: new Date(fecha_fabricacionDelete),
          cantidad_motor: 3,
          reportes: []
        };

        jest
          .spyOn(repository, 'findOne')
          .mockResolvedValue(existingEmbarcacion);
        jest
          .spyOn(repository, 'delete')
          .mockResolvedValue({ affected: 1, raw: {} });

        expect(await service.delete(uuid)).toMatchObject({ affected: 1 });
      });

      it('should throw an error if embarcacion does not exist', async () => {
        const uuid = '3c86d9d9-aebb-4907-b25f-462955a306b0'; // ID de una embarcacion que no existe

        jest.spyOn(repository, 'findOne').mockResolvedValue(undefined); // Simula que no se encontró la embarcacion

        try {
          await service.delete(uuid);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error.message).toBe('la embarcacion no existe!!');
          expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
        }
      });
    });
  });
});
