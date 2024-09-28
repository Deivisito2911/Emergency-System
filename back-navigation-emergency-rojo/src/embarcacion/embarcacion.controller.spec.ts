import { Test, TestingModule } from '@nestjs/testing';
import { EmbarcacionController } from './embarcacion.controller';
import { EmbarcacionService } from './embarcacion.service';
import { CreateEmbarcacionDto } from './dto/create-embarcacion.dto';
import { UpdateEmbarcacionDto } from './dto/update-embarcacion.dto';

describe('EmbarcacionController', () => {
  let controller: EmbarcacionController;
  let service: EmbarcacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmbarcacionController],
      providers: [
        {
          provide: EmbarcacionService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((dto: CreateEmbarcacionDto) => ({
                id: 'some-id',
                ...dto,
              })),
            gets: jest.fn().mockResolvedValue([
              { id: 'some-id-1', name: 'Embarcacion 1' },
              { id: 'some-id-2', name: 'Embarcacion 2' },
            ]),
            getByUUID: jest.fn().mockImplementation((uuid: string) => ({
              id: uuid,
              name: `Embarcacion ${uuid}`,
            })),
            delete: jest.fn().mockResolvedValue({}),
            update: jest
              .fn()
              .mockImplementation(
                (uuid: string, dto: UpdateEmbarcacionDto) => ({
                  id: uuid,
                  ...dto,
                })
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<EmbarcacionController>(EmbarcacionController);
    service = module.get<EmbarcacionService>(EmbarcacionService);
  });

  it('deberia estar definida', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deberia crear una nueva embarcacion', async () => {
      const fecha_fabricacion = '2009-08-25';
      const createDto: CreateEmbarcacionDto = {
        id: '3c86d9d9-aebb-4907-b25f-462955a306b0',
        nombre: 'Titanic',
        tipo_embarcacion: 'Carga Pesada',
        tipo_material: 'Hierro',
        capacidad_maxima: 1000,
        peso_embarcacion: 650,
        fecha_fabricacion: new Date(fecha_fabricacion),
        cantidad_motor: 3,
      };
      expect(await controller.create(createDto)).toEqual({
        id: 'some-id',
        ...createDto,
      });
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('gets', () => {
    it('deberia retornar un arreglo de embarcaciones', async () => {
      expect(await controller.gets()).toEqual([
        { id: 'some-id-1', name: 'Embarcacion 1' },
        { id: 'some-id-2', name: 'Embarcacion 2' },
      ]);
      expect(service.gets).toHaveBeenCalled();
    });
  });

  describe('getByUUID', () => {
    it('deberia retornar una embarcacion por un UUID', async () => {
      const uuid = 'some-id';
      expect(await controller.getByUUID(uuid)).toEqual({
        id: uuid,
        name: `Embarcacion ${uuid}`,
      });
      expect(service.getByUUID).toHaveBeenCalledWith(uuid);
    });
  });

  describe('delete', () => {
    it('Deberia eliminar una embarcacion con un UUID asociado', async () => {
      const uuid = 'some-id';
      expect(await controller.delete(uuid)).toEqual({});
      expect(service.delete).toHaveBeenCalledWith(uuid);
    });
  });

  describe('update', () => {
    it('Deberia actualizar una embarcacion con un UUID asociado', async () => {
      const updateDto: UpdateEmbarcacionDto = { nombre: 'Updated Embarcacion' };
      const uuid = 'some-id';
      expect(await controller.update(uuid, updateDto)).toEqual({
        id: uuid,
        ...updateDto,
      });
      expect(service.update).toHaveBeenCalledWith(uuid, updateDto);
    });
  });
});
