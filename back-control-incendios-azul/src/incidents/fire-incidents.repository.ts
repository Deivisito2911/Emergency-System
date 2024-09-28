import { Injectable, Inject } from '@nestjs/common';
import {
  DocumentClient,
  DocumentClientProviderName,
} from '../interfaces/DocumentClient.interface';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';

@Injectable()
export class FireIncidentsRepository {
  constructor(
    @Inject(DocumentClientProviderName)
    private readonly documentClient: DocumentClient
  ) {}

  async createDocument(data: CreateIncidentDto): Promise<any> {
    const docRef = await this.documentClient.createDocument('incidents', data);
    return { id: docRef.id, ...data };
  }

  async createDocumentRm(data: any): Promise<any> {
    const docRef = await this.documentClient.createDocument(
      'rm-incidents',
      data
    );
    return { id: docRef.id, ...data };
  }

  async updateDocument(id: string, data: UpdateIncidentDto): Promise<any> {
    await this.documentClient.setData('incidents', id, data);
    return { id, ...data };
  }

  async getData(id: string): Promise<any> {
    return await this.documentClient.getData('incidents', id);
  }

  async getInfoMarkers() {
    return this.documentClient.getInfoMarkers('incidents');
  }

  async getAllDocuments() {
    return this.documentClient.getAllDocuments('incidents');
  }

  async deleteDocument(id: string): Promise<void> {
    await this.documentClient.deleteDocument('incidents', id);
  }
}
