import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDenuncianteDto } from './dto/update-denunciante.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Denunciante } from './denunciante.entity';
import { CreateDenuncianteDto } from './dto/create-denunciante.dto';
import { Incidencia } from '../incidencia/incidencia.entity';

@Injectable()
export class DenuncianteService {
  constructor(
    @InjectRepository(Denunciante)
    private denuncianteRepo: Repository<Denunciante>
  ) {}

  create(
    Denunciante: CreateDenuncianteDto,
    incidencia: Incidencia
  ): Promise<Denunciante> {
    const newDenunciante = this.denuncianteRepo.create(Denunciante);
    newDenunciante.incidencia = incidencia;
    return this.denuncianteRepo.save(newDenunciante);
  }

  findAll(): Promise<Denunciante[]> {
    return this.denuncianteRepo.find();
  }

  findOne(id: string): Promise<Denunciante> {
    return this.comprobarExistencia(id);
  }

  async update(
    id: string,
    updateDenuncianteDto: UpdateDenuncianteDto
  ): Promise<Denunciante> {
    const existingDenunciante = await this.comprobarExistencia(id)
    const updatedDenunciante = this.denuncianteRepo.merge(
      existingDenunciante,
      updateDenuncianteDto
    );
    return this.denuncianteRepo.save(updatedDenunciante);
  }

  async comprobarExistencia(id: string): Promise<Denunciante> {
    const comprobarDenunciante = await this.denuncianteRepo.findOneBy({ id });
    if (!comprobarDenunciante) {
      throw new NotFoundException(`Denunciante no registrado`);
    }
    return comprobarDenunciante;
  }
}
