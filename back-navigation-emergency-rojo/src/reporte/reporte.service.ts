import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reporte } from './reporte.entity';
import { Repository } from 'typeorm';
import { EmbarcacionService } from '../embarcacion/embarcacion.service';
import { AlertaService } from '../alerta/alerta.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

@Injectable()
export class ReporteService {
  constructor(
    @InjectRepository(Reporte) private reporteRepository: Repository<Reporte>,
    private embarcacionService: EmbarcacionService,
    private alertaService: AlertaService
  ) {}

  async create(reporte: CreateReporteDto) {
    const embarcacion_encontrada = await this.embarcacionService.getByUUID(
      reporte.embarcacionId
    );
    const alerta_encontrada = await this.alertaService.getByUUID(
      reporte.alertaId
    );

    if (!embarcacion_encontrada)
      throw new HttpException(
        'No se encontro la embarcacion!!',
        HttpStatus.NOT_FOUND
      );

    if (!alerta_encontrada)
      throw new HttpException(
        'No se encontro la alerta!!',
        HttpStatus.NOT_FOUND
      );

    const nuevo_reporte = this.reporteRepository.create(reporte);
    return this.reporteRepository.save(nuevo_reporte);
  }

  gets() {
    return this.reporteRepository.find();
  }

  async update(uuid: string, reporte: UpdateReporteDto) {
    const reporte_encontrado = await this.reporteRepository.findOne({
      where: {
        id: uuid,
      },
    });

    if (!reporte_encontrado) {
      throw new HttpException('El reporte no existe!!', HttpStatus.NOT_FOUND);
    }

    const reporte_actualizado = Object.assign(reporte_encontrado, reporte);
    return this.reporteRepository.save(reporte_actualizado);
  }

  async delete(uuid: string) {
    const reporte_encontrado = await this.reporteRepository.findOne({
      where: {
        id: uuid,
      },
    });

    if (!reporte_encontrado) {
      throw new HttpException('El reporte no existe!!', HttpStatus.NOT_FOUND);
    }

    return this.reporteRepository.delete({ id: uuid });
  }

  async getByUUID(uuid: string) {
    const reporte_encontrado = await this.reporteRepository.findOne({
      where: {
        id: uuid,
      },
    });

    if (!reporte_encontrado) {
      throw new HttpException('El reporte no existe!!', HttpStatus.NOT_FOUND);
    }

    return reporte_encontrado;
  }
}
