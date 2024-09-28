import { Injectable } from '@nestjs/common';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { firebaseApp } from './firebaseConfig';

@Injectable()
export abstract class FirebaseRepository {
  protected db: Firestore;
  protected abstract collection: string;

  constructor() {
    this.db = getFirestore(firebaseApp);
  }

  async getData(document: string) {
    const doc = await this.db.collection(this.collection).doc(document).get();
    return doc.exists ? doc.data() : undefined;
  }

  async setData(document: string, data: any) {
    await this.db.collection(this.collection).doc(document).set(data);
  }

  async getAllDocuments() {
    const snapshot = await this.db.collection(this.collection)
                                  .where('status', '!=', 0)
                                  .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async deleteDocument(document: string): Promise<void> {
    await this.db.collection(this.collection).doc(document).delete();
  }
}
