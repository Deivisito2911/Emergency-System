import { Injectable, NotFoundException } from '@nestjs/common';
import { Operador } from './operador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOperadorDto } from './dto/update-operador.dto';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class OperadorService {
  constructor(
    @InjectRepository(Operador)
    private operadorRepository: Repository<Operador>,
    private logsService: LogsService
  ) {}

  findAll(): Promise<Operador[]> {
    return this.operadorRepository.find();
  }

  findOne(cedula: string): Promise<Operador> {
    return this.comprobarExistencia({ cedula });
  }

  create(operador: object): Promise<Operador> {
    const newOperador = this.operadorRepository.create(operador);
    return this.operadorRepository.save(newOperador);
  }

  async update(
    cedula: string,
    updateOperador: UpdateOperadorDto
  ): Promise<Operador> {
    const existingOperador = await this.comprobarExistencia({ cedula });
    const updatedOperador = this.operadorRepository.merge(
      existingOperador,
      updateOperador
    );
    return this.operadorRepository.save(updatedOperador);
  }

  async comprobarExistencia(param: object): Promise<Operador> {
    const comprobarOperador = await this.operadorRepository.findOneBy(param);
    if (!comprobarOperador) {
      const error = new NotFoundException(`Operador no registrado`);
      this.logsService.error(error);
      throw error;
    }
    return comprobarOperador;
  }

  async getCorreo(correo: string): Promise<string> {
    const getOperador = await this.comprobarExistencia({ correo });
    return getOperador.nombre;
  }
}
