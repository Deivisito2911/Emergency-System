import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAfectadoDto } from './dto/update-afectado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Afectado } from './afectado.entity';
import { CreateAfectadoDto } from './dto/create-afectado.dto';

@Injectable()
export class AfectadoService {
  constructor(
    @InjectRepository(Afectado)
    private afectadoRepository: Repository<Afectado>
  ) {}

  findAll(): Promise<Afectado[]> {
    return this.afectadoRepository.find();
  }

  findOne(id: string): Promise<Afectado> {
    return this.comprobarExistencia(id);
  }

  async remove(id: string): Promise<void> {
    await this.comprobarExistencia(id);
    await this.afectadoRepository.softDelete(id);
  }

  create(afectado: CreateAfectadoDto): Promise<Afectado> {
    const newAfectado = this.afectadoRepository.create(afectado);
    return this.afectadoRepository.save(newAfectado);
  }

  async update(
    id: string,
    updateAfectadoDto: UpdateAfectadoDto
  ): Promise<Afectado> {
    const existingAfectado = await this.comprobarExistencia(id)
    const updatedAfectado = this.afectadoRepository.merge(
      existingAfectado,
      updateAfectadoDto
    );
    return this.afectadoRepository.save(updatedAfectado);
  }

  async comprobarExistencia(id: string): Promise<Afectado > {
    const comprobarAfectado = await this.afectadoRepository.findOneBy({ id });
    if (!comprobarAfectado) {
      throw new NotFoundException(`Afectado no registrado`);
    }
    return comprobarAfectado;
  }

}
