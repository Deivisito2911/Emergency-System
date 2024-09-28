import { Injectable, NotFoundException } from '@nestjs/common';
import { FireIncidentsRepository } from './fire-incidents.repository';
import { Incident } from '../interfaces/incidents.interface';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';

@Injectable()
export class FireIncidentsService {
  constructor(
    private readonly fireIncidentsRepository: FireIncidentsRepository
  ) {}

  async getIncident(id: string): Promise<Incident> {
    const data = await this.fireIncidentsRepository.getData(id);
    if (!data) {
      throw new NotFoundException('Información no encontrada');
    }
    return data;
  }

  async getInfoMarkers() {
    const docs = await this.fireIncidentsRepository.getInfoMarkers();
    return docs.length ? docs : [];
  }

  async getAllIncidents() {
    const docs = await this.fireIncidentsRepository.getAllDocuments();
    return docs.length ? docs : { message: 'No hay incidentes activos' };
  }

  async createIncident(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    return await this.fireIncidentsRepository.createDocument(createIncidentDto);
  }

  async updateIncident(id: string, updateIncidentDto: UpdateIncidentDto): Promise<Incident> {
    return await this.fireIncidentsRepository.updateDocument(id, updateIncidentDto);
  }

  async deleteIncident(id: string) {
    const incident = await this.fireIncidentsRepository.getData(id);
    if (!incident) {
      throw new NotFoundException('Incidente no encontrado');
    }

    await this.fireIncidentsRepository.createDocumentRm(incident);
    await this.fireIncidentsRepository.deleteDocument(id);
    return { message: 'Incidente eliminado correctamente' };
  }
}
