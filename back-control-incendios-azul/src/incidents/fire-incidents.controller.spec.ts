import { Test, TestingModule } from '@nestjs/testing';
import { FireIncidentsController } from './fire-incidents.controller';
import { FireIncidentsService } from './fire-incidents.service';
import { Incident } from '../interfaces/incidents.interface';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentType, IncidentPriority, IncidentMagnitude, IncidentEstatus } from '../enums';

describe('FireIncidentsController', () => {
  let controller: FireIncidentsController;
  let service: FireIncidentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FireIncidentsController],
      providers: [
        {
          provide: FireIncidentsService,
          useValue: {
            getIncident: jest.fn(),
            createIncident: jest.fn(),
            updateIncident: jest.fn(),
            getAllIncidents: jest.fn(),
            deleteIncident: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FireIncidentsController>(FireIncidentsController);
    service = module.get<FireIncidentsService>(FireIncidentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getIncident', () => {
    it('should return a single incident', async () => {
      const mockIncident: Incident = {
        id: '1',
        titulo: 'Test Incident',
        tipoIncendio: IncidentType.FORESTAL,
        prioridad: IncidentPriority.HIGH,
        magnitud: IncidentMagnitude.TOTAL,
        estatus: IncidentEstatus.ACUDIENDO,
        depBomberos: 'Mariño',
        latitud: 10.1234,
        longitud: -64.5678,
      };
      jest.spyOn(service, 'getIncident').mockResolvedValue(mockIncident);

      expect(await controller.getIncident('1')).toEqual(mockIncident);
      expect(service.getIncident).toHaveBeenCalledWith('1');
    });
  });

  describe('createIncident', () => {
    it('should create an incident', async () => {
      const incidentData: CreateIncidentDto = {
        titulo: 'New Incident',
        tipoIncendio: IncidentType.URBANO,
        prioridad: IncidentPriority.MEDIUM,
        magnitud: IncidentMagnitude.PARCIAL,
        estatus: IncidentEstatus.ACUDIENDO,
        depBomberos: 'Garcia',
        latitud: 10.1234,
        longitud: -64.5678,
      };
      const mockIncident: Incident = {
        id: '1',
        titulo: incidentData.titulo,
        tipoIncendio: incidentData.tipoIncendio,
        prioridad: incidentData.prioridad,
        magnitud: incidentData.magnitud,
        estatus: incidentData.estatus,
        depBomberos: incidentData.depBomberos,
        latitud: incidentData.latitud,
        longitud: incidentData.longitud,
      };
      jest.spyOn(service, 'createIncident').mockResolvedValue(mockIncident);

      expect(await controller.createIncident(incidentData)).toEqual(mockIncident);
      expect(service.createIncident).toHaveBeenCalledWith(incidentData);
    });
  });

  describe('updateIncident', () => {
    it('should update an incident', async () => {
      const data: UpdateIncidentDto = {
        titulo: 'Updated Incident',
        tipoIncendio: IncidentType.INDUSTRIAL,
        prioridad: IncidentPriority.LOW,
        magnitud: IncidentMagnitude.CONATO,
        estatus: IncidentEstatus.FINALIZADO,
        depBomberos: 'Maneiro',
        latitud: 10.1234,
        longitud: -64.5678,
      };
      const mockIncident: Incident = {
        id: '1',
        titulo: data.titulo || 'default titulo',
        tipoIncendio: data.tipoIncendio || IncidentType.URBANO,
        prioridad: data.prioridad || IncidentPriority.MEDIUM,
        magnitud: data.magnitud || IncidentMagnitude.PARCIAL,
        estatus: data.estatus || IncidentEstatus.ACUDIENDO,
        depBomberos: data.depBomberos || 'default depBomberos',
        latitud: data.latitud || 0,
        longitud: data.longitud || 0,
      };
      jest.spyOn(service, 'updateIncident').mockResolvedValue(mockIncident);

      expect(await controller.updateIncident('1', data)).toEqual(mockIncident);
      expect(service.updateIncident).toHaveBeenCalledWith('1', data);
    });
  });

  describe('getAllIncidents', () => {
    it('should return an array of incidents', async () => {
      const mockIncidents: Incident[] = [
        {
          id: '1',
          titulo: 'Test Incident',
          tipoIncendio: IncidentType.FORESTAL,
          prioridad: IncidentPriority.HIGH,
          magnitud: IncidentMagnitude.TOTAL,
          estatus: IncidentEstatus.ACUDIENDO,
          depBomberos: 'Mariño',
          latitud: 10.1234,
          longitud: -64.5678,
        },
      ];
      jest.spyOn(service, 'getAllIncidents').mockResolvedValue(mockIncidents);

      expect(await controller.getAllIncidents()).toEqual(mockIncidents);
      expect(service.getAllIncidents).toHaveBeenCalled();
    });
  });

  describe('deleteIncident', () => {
    it('should delete an incident', async () => {
      const response = { message: 'Incident deleted successfully' };
      jest.spyOn(service, 'deleteIncident').mockResolvedValue(response);

      expect(await controller.deleteIncident('1')).toEqual(response);
      expect(service.deleteIncident).toHaveBeenCalledWith('1');
    });
  });
});
