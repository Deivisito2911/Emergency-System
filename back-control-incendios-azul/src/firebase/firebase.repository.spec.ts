import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseRepository } from './firebase.repository';
import mockCollection from '../tests/__mocks__/mockCollection.spec'

jest.mock('./firebaseConfig', () => ({
  firebaseApp: {},
}));

jest.mock('firebase-admin/firestore', () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => mockCollection),
  })),
}));

class MockDocumentRepository extends FirebaseRepository {
  protected collection = 'test-collection';
}

describe('FirebaseRepository', () => {
  let repository: FirebaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: FirebaseRepository, useClass: MockDocumentRepository },
      ],
    }).compile();

    repository = module.get<FirebaseRepository>(FirebaseRepository);
  });

  describe('getData', () => {
    it('should return data if document exists', async () => {
      const result = await repository.getData('testDoc');
      expect(result).toEqual({ message: 'Mock Data' });
    });

    it('should return undefined if document does not exist', async () => {
      mockCollection.doc().get.mockResolvedValueOnce({ exists: false });
      const result = await repository.getData('testDoc');
      expect(result).toBeUndefined();
    });
  });

  describe('setData', () => {
    it('should set data in the collection', async () => {
      await repository.setData('testDoc', { message: 'Hello' });
      expect(mockCollection.doc().set).toHaveBeenCalledWith({ message: 'Hello' });
    });
  });

  describe('getAllDocuments', () => {
    it('should return all documents that match the status filter', async () => {
      const data = [{ id: '1', status: 1 }];
      mockCollection.where().get.mockResolvedValueOnce({ docs: data.map(d => ({ id: d.id, data: () => d })) });

      const documents = await repository.getAllDocuments();
      expect(documents).toEqual(data);
    });
  });

  describe('deleteDocument', () => {
    it('should delete document by id', async () => {
      await repository.deleteDocument('testDoc');
      expect(mockCollection.doc().delete).toHaveBeenCalledWith();
    });
  });
});
