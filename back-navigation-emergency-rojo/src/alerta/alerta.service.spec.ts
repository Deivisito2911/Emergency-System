import { Test, TestingModule } from '@nestjs/testing';
import { AlertaService } from './alerta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Alerta } from './alerta.entity';
import { Embarcacion } from '../embarcacion/embarcacion.entity';
import { Repository } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AlertaService', () => {
  let service: AlertaService;
  let alertRepository: Repository<Alerta>;
  let embarcRepository: Repository<Embarcacion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertaService,
        {
          provide: getRepositoryToken(Alerta),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Embarcacion),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AlertaService>(AlertaService);
    alertRepository = module.get<Repository<Alerta>>(
      getRepositoryToken(Alerta)
    );
    embarcRepository = module.get<Repository<Embarcacion>>(
      getRepositoryToken(Embarcacion)
    );
  });

  it('deberia estar definida', () => {
    expect(service).toBeDefined();
  });

  describe('getAlerts', () => {
    it('deberia retornar un arreglo de alertas', async () => {
      const alertArray = [
        { id: '1', descripcion: 'Alerta 1', embarcacion: {} } as Alerta,
        { id: '2', descripcion: 'Alerta 2', embarcacion: {} } as Alerta,
      ];
      jest.spyOn(alertRepository, 'find').mockResolvedValue(alertArray);

      expect(await service.gets()).toBe(alertArray);
      expect(alertRepository.find).toHaveBeenCalledWith({
        relations: ['embarcacion'],
      });
    });
  });

  describe('crearAlerta', () => {
    it('deberia crear una nueva alerta', async () => {
      const uuid = 'some-uuid';
      const createAlertDto: CreateAlertDto = {
        id: 'uuid-alerta',
        descripcion: 'Nueva Alerta',
      };
      const embarcacion = { id: uuid, nombre: 'Embarcacion 1' } as Embarcacion;
      const newAlert = { ...createAlertDto, embarcacion } as Alerta;

      jest.spyOn(embarcRepository, 'findOne').mockResolvedValue(embarcacion);
      jest.spyOn(alertRepository, 'create').mockReturnValue(newAlert);
      jest.spyOn(alertRepository, 'save').mockResolvedValue(newAlert);

      expect(await service.create(uuid, createAlertDto)).toBe(newAlert);
      expect(embarcRepository.findOne).toHaveBeenCalledWith({
        where: { id: uuid },
      });
      expect(alertRepository.create).toHaveBeenCalledWith(createAlertDto);
      expect(alertRepository.save).toHaveBeenCalledWith(newAlert);
    });

    it('deberia retornar un HttpException si la embarcacion no existe', async () => {
      const uuid = 'non-existent-uuid';
      const createAlertDto: CreateAlertDto = {
        id: 'uuid-alerta',
        descripcion: 'Nueva Alerta',
      };

      jest.spyOn(embarcRepository, 'findOne').mockResolvedValue(null);

      try {
        await service.create(uuid, createAlertDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe('la embarcacion no existe!!');
      }
      expect(embarcRepository.findOne).toHaveBeenCalledWith({
        where: { id: uuid },
      });
    });
  });
});
