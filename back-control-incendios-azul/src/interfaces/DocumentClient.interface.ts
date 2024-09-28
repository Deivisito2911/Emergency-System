import { DocumentReference, WhereFilterOp } from 'firebase-admin/firestore';

export interface DocumentClient {
  getData(collection: string, document: string): Promise<any>;
  setData(collection: string, document: string, data: any): Promise<void>;
  getAllDocuments(collection: string): Promise<any[]>;
  createDocument(collection: string, data: any): Promise<DocumentReference>;
  getAllDocumentsWithCondition(collection: string, field: string, operator: WhereFilterOp, value: any): Promise<any[]>;
  deleteDocument(collection: string, documentId: string): Promise<void>;
  getInfoMarkers(collection: string): Promise<any[]>;
  
}

export const DocumentClientProviderName = 'DocumentClient';
