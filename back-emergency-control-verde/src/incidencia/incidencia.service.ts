import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { Incidencia } from './incidencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperadorService } from '../operador/operador.service';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { plainToInstance } from 'class-transformer';
import { Denunciante } from '../denunciante/denunciante.entity';
import { LogsService } from '../logs/logs.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
    private operadorService: OperadorService,
    private logService: LogsService,
    private emailService: EmailService
  ) {}

  findAll(): Promise<Incidencia[]> {
    return this.incidenciaRepository.find();
  }

  async findOne(codigo: string): Promise<Incidencia> {
    return await this.comprobarExistencia(codigo);
  }

  async create(incidencia: CreateIncidenciaDto): Promise<Incidencia> {
    const newIncidencia = this.incidenciaRepository.create(incidencia);
    newIncidencia.operador = await this.operadorService.findOne('22650420'); //! unicamente hasta que se integre el inicio de sesion
    newIncidencia.denunciante = plainToInstance(
      Denunciante,
      incidencia.denunciante
    );

    const savedIncidencia = await this.incidenciaRepository.save(newIncidencia);

    this.emailService.notifyOrganismo(savedIncidencia.tipo, savedIncidencia);

    return savedIncidencia;
  }

  async update(
    codigo: string,
    updateIncidencia: UpdateIncidenciaDto
  ): Promise<Incidencia> {
    const existingIncidencia = await this.comprobarExistencia(codigo);
    const updatedIncidencia = this.incidenciaRepository.merge(
      existingIncidencia,
      updateIncidencia
    );
    return this.incidenciaRepository.save(updatedIncidencia);
  }

  async comprobarExistencia(codigo: string): Promise<Incidencia> {
    const comprobarIncidencia = await this.incidenciaRepository.findOneBy({
      codigo,
    });
    if (!comprobarIncidencia) {
      const notfound = new NotFoundException('Incidencia no registrada');
      this.logService.error(notfound);
      throw notfound;
    }
    return comprobarIncidencia;
  }
}
