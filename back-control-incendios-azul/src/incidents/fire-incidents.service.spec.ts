import { Test, TestingModule } from '@nestjs/testing';
import { FireIncidentsService } from './fire-incidents.service';
import { FireIncidentsRepository } from './fire-incidents.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentType, IncidentPriority, IncidentMagnitude, IncidentEstatus } from '../enums';

describe('FireIncidentsService', () => {
  let service: FireIncidentsService;
  let repository: FireIncidentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FireIncidentsService,
        {
          provide: FireIncidentsRepository,
          useValue: {
            getData: jest.fn(),
            getAllDocuments: jest.fn(),
            createDocument: jest.fn(),
            updateDocument: jest.fn(),
            createDocumentRm: jest.fn(),
            deleteDocument: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FireIncidentsService>(FireIncidentsService);
    repository = module.get<FireIncidentsRepository>(FireIncidentsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getIncident', () => {
    it('should return an incident', async () => {
      const mockIncident = {
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
      jest.spyOn(repository, 'getData').mockResolvedValue(mockIncident);

      const result = await service.getIncident('1');
      expect(result).toEqual(mockIncident);
      expect(repository.getData).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if incident not found', async () => {
      jest.spyOn(repository, 'getData').mockResolvedValue(null);

      await expect(service.getIncident('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllIncidents', () => {
    it('should return all incidents', async () => {
      const mockIncidents = [
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
      jest.spyOn(repository, 'getAllDocuments').mockResolvedValue(mockIncidents);

      const result = await service.getAllIncidents();
      expect(result).toEqual(mockIncidents);
      expect(repository.getAllDocuments).toHaveBeenCalled();
    });

    it('should return a message if no incidents are found', async () => {
      jest.spyOn(repository, 'getAllDocuments').mockResolvedValue([]);

      const result = await service.getAllIncidents();
      expect(result).toEqual({ message: 'No hay incidentes activos' });
      expect(repository.getAllDocuments).toHaveBeenCalled();
    });
  });

  describe('createIncident', () => {
    it('should create a new incident', async () => {
      const mockIncident = {
        id: '1',
        titulo: 'New Incident',
        tipoIncendio: IncidentType.URBANO,
        prioridad: IncidentPriority.MEDIUM,
        magnitud: IncidentMagnitude.PARCIAL,
        estatus: IncidentEstatus.ACUDIENDO,
        depBomberos: 'Garcia',
        latitud: 10.1234,
        longitud: -64.5678,
      };
      jest.spyOn(repository, 'createDocument').mockResolvedValue(mockIncident);

      const data: CreateIncidentDto = {
        titulo: 'New Incident',
        tipoIncendio: IncidentType.URBANO,
        prioridad: IncidentPriority.MEDIUM,
        magnitud: IncidentMagnitude.PARCIAL,
        estatus: IncidentEstatus.ACUDIENDO,
        depBomberos: 'Garcia',
        latitud: 10.1234,
        longitud: -64.5678,
      };

      const result = await service.createIncident(data);
      expect(result).toEqual(mockIncident);  // Adjusted to expect only the incident
      expect(repository.createDocument).toHaveBeenCalledWith(data);
    });
  });

  describe('updateIncident', () => {
    it('should update an incident', async () => {
      const mockIncident = {
        id: '1',
        titulo: 'Updated Incident',
        tipoIncendio: IncidentType.INDUSTRIAL,
        prioridad: IncidentPriority.LOW,
        magnitud: IncidentMagnitude.CONATO,
        estatus: IncidentEstatus.FINALIZADO,
        depBomberos: 'Maneiro',
        latitud: 10.1234,
        longitud: -64.5678,
      };
      jest.spyOn(repository, 'updateDocument').mockResolvedValue(mockIncident);

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

      const result = await service.updateIncident('1', data);
      expect(result).toEqual(mockIncident);  // Adjusted to expect only the incident
      expect(repository.updateDocument).toHaveBeenCalledWith('1', data);
    });
  });

  describe('deleteIncident', () => {
    it('should delete an incident', async () => {
      const mockIncident = {
        id: '1',
        titulo: 'Test Incident',
        tipoIncendio: IncidentType.FORESTAL,
        prioridad: IncidentPriority.HIGH,
        magnitud: IncidentMagnitude.TOTAL,
        estatus: IncidentEstatus.CANCELADO,
        depBomberos: 'Mariño',
        latitud: 10.1234,
        longitud: -64.5678,
      };
      jest.spyOn(repository, 'getData').mockResolvedValue(mockIncident);
      jest.spyOn(repository, 'createDocumentRm').mockResolvedValue(mockIncident);
      jest.spyOn(repository, 'deleteDocument').mockResolvedValue(undefined);

      const result = await service.deleteIncident('1');
      expect(result).toEqual({ message: 'Incidente eliminado correctamente' });
      expect(repository.getData).toHaveBeenCalledWith('1');
      expect(repository.createDocumentRm).toHaveBeenCalledWith(mockIncident);
      expect(repository.deleteDocument).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if incident not found', async () => {
      jest.spyOn(repository, 'getData').mockResolvedValue(null);

      await expect(service.deleteIncident('1')).rejects.toThrow(NotFoundException);
    });
  });
});
