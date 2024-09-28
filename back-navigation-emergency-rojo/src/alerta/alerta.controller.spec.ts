import { Test, TestingModule } from '@nestjs/testing';
import { AlertaController } from './alerta.controller';
import { AlertaService } from './alerta.service';
import { Alerta } from './alerta.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AlertaController', () => {
  let controller: AlertaController;
  let service: AlertaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertaController],
      providers: [
        {
          provide: AlertaService,
          useValue: {
            gets: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AlertaController>(AlertaController);
    service = module.get<AlertaService>(AlertaService);
  });

  it('deberia estar definida', () => {
    expect(controller).toBeDefined();
  });

  describe('gets', () => {
    it('deberia retornar un arreglo de alertas', async () => {
      const result = [
        { id: '1', descripcion: 'Alerta 1', embarcacion: {} } as Alerta,
        { id: '2', descripcion: 'Alerta 2', embarcacion: {} } as Alerta,
      ];
      jest.spyOn(service, 'gets').mockResolvedValue(result);

      expect(await controller.gets()).toBe(result);
      expect(service.gets).toHaveBeenCalled();
    });
  });

  describe('createAlert', () => {
    it('deberia crear una nueva alerta', async () => {
      const uuid = 'some-uuid';
      const createAlertDto: CreateAlertDto = {
        id: 'uuid-alerta',
        descripcion: 'Nueva Alerta',
      };
      const newAlert = { id: '1', ...createAlertDto } as Alerta;

      jest.spyOn(service, 'create').mockResolvedValue(newAlert);

      expect(await controller.createAlert(uuid, createAlertDto)).toBe(newAlert);
      expect(service.create).toHaveBeenCalledWith(uuid, createAlertDto);
    });

    it('deberia retornar un HttpException si la embarcacion no existe', async () => {
      const uuid = 'non-existent-uuid';
      const createAlertDto: CreateAlertDto = {
        id: 'uuid-alerta',
        descripcion: 'Nueva Alerta',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new HttpException('la embarcacion no existe!!', HttpStatus.NOT_FOUND)
        );

      try {
        await controller.createAlert(uuid, createAlertDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe('la embarcacion no existe!!');
      }

      expect(service.create).toHaveBeenCalledWith(uuid, createAlertDto);
    });
  });
});
