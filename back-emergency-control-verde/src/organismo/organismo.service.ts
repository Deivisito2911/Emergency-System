import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganismoDto } from './dto/create-organismo.dto';
import { UpdateOrganismoDto } from './dto/update-organismo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organismo } from './organismo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganismoService {
  constructor(
    @InjectRepository(Organismo)
    private organismoRepository: Repository<Organismo>
  ) {}

  create(createOrganismoDto: CreateOrganismoDto): Promise<Organismo> {
    const newOrganismo = this.organismoRepository.create(createOrganismoDto);
    return this.organismoRepository.save(newOrganismo);
  }
  findAll(): Promise<Organismo[]> {
    return this.organismoRepository.find();
  }

  findOne(codigo: string): Promise<Organismo> {
    return this.comprobarExistencia(codigo);
  }

  async update(
    codigo: string,
    updateOrganismo: UpdateOrganismoDto
  ): Promise<Organismo> {
    const existingOrganismo = await this.comprobarExistencia(codigo)
    const updatedOrganismo = this.organismoRepository.merge(
      existingOrganismo,
      updateOrganismo
    );
    return this.organismoRepository.save(updatedOrganismo);
  }

  async comprobarExistencia(codigo: string): Promise<Organismo> {
    const comprobarOrganismo = await this.organismoRepository.findOneBy({ codigo });
    if (!comprobarOrganismo) {
      throw new NotFoundException(`Organismo no registrado`);
    }
    return comprobarOrganismo;
  }
}

