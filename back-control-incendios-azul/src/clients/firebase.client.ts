import { Injectable } from '@nestjs/common';
import { getFirestore, Firestore, DocumentReference, WhereFilterOp } from 'firebase-admin/firestore';
import { firebaseApp } from '../firebase/firebaseConfig';
import { DocumentClient } from '../interfaces/DocumentClient.interface';

@Injectable()
export class FirebaseClient implements DocumentClient {
  private db: Firestore;

  constructor() {
    this.db = getFirestore(firebaseApp);
  }

  async getData(collection: string, document: string) {
    const doc = await this.db.collection(collection).doc(document).get();
    return doc.exists ? doc.data() : undefined;
  }

  async setData(collection: string, document: string, data: any) {
    await this.db.collection(collection).doc(document).set(data);
  }
  async getInfoMarkers(collection: string): Promise<any[]> {
    const snapshot = await this.db.collection(collection).get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        tipoIncendio: data.tipoIncendio,
        latitud: data.latitud,
        longitud: data.longitud
      };
    });
  }
  
  async getAllDocuments(collection: string): Promise<any[]> {
    const snapshot = await this.db.collection(collection).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async createDocument(collection: string, data: any): Promise<DocumentReference> {
    return await this.db.collection(collection).add(data);
  }

  async getAllDocumentsWithCondition(collection: string, field: string, operator: WhereFilterOp, value: any): Promise<any[]> {
    const snapshot = await this.db.collection(collection).where(field, operator, value).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async deleteDocument(collection: string, documentId: string): Promise<void> {
    await this.db.collection(collection).doc(documentId).delete();
  }
}
