import { Test, TestingModule } from '@nestjs/testing';
import { FireIncidentsRepository } from './fire-incidents.repository';
import { DocumentClient, DocumentClientProviderName } from '../interfaces/DocumentClient.interface';
import { DocumentReference, Firestore } from 'firebase-admin/firestore';
import { CreateIncidentDto } from '../incidents/dto/create-incident.dto'; 
import { UpdateIncidentDto } from '../incidents/dto/update-incident.dto'; 
import { IncidentType, IncidentPriority, IncidentMagnitude, IncidentEstatus } from '../enums';

const createIncidentData: CreateIncidentDto = {
  titulo: 'Test Incident',
  tipoIncendio: IncidentType.FORESTAL,
  prioridad: IncidentPriority.HIGH,
  magnitud: IncidentMagnitude.TOTAL,
  estatus: IncidentEstatus.ACUDIENDO,
  depBomberos: 'Mariño',
  latitud: 10.1234,
  longitud: -66.1234,
};

const updateIncidentData: UpdateIncidentDto = {
  titulo: 'Updated Incident',
  tipoIncendio: IncidentType.URBANO,
  prioridad: IncidentPriority.MEDIUM,
  magnitud: IncidentMagnitude.PARCIAL,
  estatus: IncidentEstatus.FINALIZADO,
  depBomberos: 'Garcia',
  latitud: 10.5678,
  longitud: -66.5678,
};

describe('FireIncidentsRepository', () => {
  let repository: FireIncidentsRepository;
  let documentClientMock: jest.Mocked<DocumentClient>;

  beforeEach(async () => {
    const mockDocumentRef: Partial<DocumentReference> = {
      id: '123',
      firestore: {} as Firestore,
      parent: {} as any,
      path: '',
      collection: jest.fn(),
      isEqual: jest.fn(),
      listCollections: jest.fn(),
    };

    documentClientMock = {
      createDocument: jest.fn().mockResolvedValue(mockDocumentRef as DocumentReference),
      setData: jest.fn(),
      getData: jest.fn(),
      getAllDocuments: jest.fn(),
      getAllDocumentsWithCondition: jest.fn(),
      deleteDocument: jest.fn(),
      getInfoMarkers: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FireIncidentsRepository,
        { provide: DocumentClientProviderName, useValue: documentClientMock },
      ],
    }).compile();

    repository = module.get<FireIncidentsRepository>(FireIncidentsRepository);
  });

  describe('createDocument', () => {
    it('should create a new document', async () => {
      const data = createIncidentData;
      const result = await repository.createDocument(data);
      expect(result).toEqual({ id: '123', ...data });
      expect(documentClientMock.createDocument).toHaveBeenCalledWith('incidents', data);
    });
  });

  describe('createDocumentRm', () => {
    it('should create a new document in rm-incidents collection', async () => {
      const data = createIncidentData;
      const mockDocumentRef: Partial<DocumentReference> = {
        id: '456',
        firestore: {} as Firestore,
        parent: {} as any,
        path: '',
        collection: jest.fn(),
        isEqual: jest.fn(),
        listCollections: jest.fn(),
      };

      documentClientMock.createDocument.mockResolvedValueOnce(mockDocumentRef as DocumentReference);

      const result = await repository.createDocumentRm(data);
      expect(result).toEqual({ id: '456', ...data });
      expect(documentClientMock.createDocument).toHaveBeenCalledWith('rm-incidents', data);
    });
  });

  describe('updateDocument', () => {
    it('should update an existing document', async () => {
      const data = updateIncidentData;
      const id = '123';
      const result = await repository.updateDocument(id, data);
      expect(result).toEqual({ id, ...data });
      expect(documentClientMock.setData).toHaveBeenCalledWith('incidents', id, data);
    });
  });

  describe('getData', () => {
    it('should return document data by id', async () => {
      const data = { id: '123', titulo: 'Test Incident' }; 
      documentClientMock.getData.mockResolvedValue(data);

      const result = await repository.getData('123');
      expect(result).toEqual(data);
      expect(documentClientMock.getData).toHaveBeenCalledWith('incidents', '123');
    });
  });

  describe('getAllDocuments', () => {
    it('should return all documents', async () => {
      const data = [{ id: '123', titulo: 'Test Incident' }]; 
      documentClientMock.getAllDocuments.mockResolvedValue(data);

      const result = await repository.getAllDocuments();
      expect(result).toEqual(data);
      expect(documentClientMock.getAllDocuments).toHaveBeenCalledWith('incidents');
    });
  });

  describe('deleteDocument', () => {
    it('should delete document by id', async () => {
      const id = '123';

      await repository.deleteDocument(id);
      expect(documentClientMock.deleteDocument).toHaveBeenCalledWith('incidents', id);
    });
  });
});
