import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alerta } from './alerta.entity';
import { Repository } from 'typeorm';
import { Embarcacion } from '../embarcacion/embarcacion.entity';
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AlertaService {
  constructor(
    @InjectRepository(Alerta) private alertRepository: Repository<Alerta>,
    @InjectRepository(Embarcacion)
    private embarcacionRepository: Repository<Embarcacion>
  ) {}

  //Listar todas las alertas asociadas a una embarcacion
  gets() {
    return this.alertRepository.find({
      relations: ['embarcacion'],
    });
  }

  async getByUUID(uuid: string) {
    const alerta_encontrada = await this.alertRepository.findOne({
      where: {
        id: uuid
      },
    });

    if (!alerta_encontrada) {
      throw new HttpException('la alerta no existe!!', HttpStatus.NOT_FOUND);
    }

    return alerta_encontrada;
  }

  //Registrar una alerta asociada a una embarcacion
  async create(uuid: string, alerta: CreateAlertDto) {
    const embarcacion_encontrada = await this.embarcacionRepository.findOne({
      where: {
        id: uuid,
      },
    });

    //Si la embarcacion no existe, genera un error
    if (!embarcacion_encontrada) {
      throw new HttpException(
        'la embarcacion no existe!!',
        HttpStatus.NOT_FOUND
      );
    }

    const newAlert = this.alertRepository.create(alerta);
    newAlert.embarcacion = embarcacion_encontrada;

    return this.alertRepository.save(newAlert);
  }

  async getByEmbarcacionUUId(
    embarcacionId: string
  ): Promise<Alerta | undefined> {
    return this.alertRepository.findOne({
      where: {
        embarcacion: {
          id: embarcacionId,
        },
      },
      relations: ['embarcacion'],
    });
  }

  async delete(uuid: string) {
    const alerta_encontrada = await this.alertRepository.findOne({
      where: {
        id: uuid
      },
    });

    if (!alerta_encontrada) {
      throw new HttpException('la alerta no existe!!', HttpStatus.NOT_FOUND);
    }

    return this.alertRepository.delete({ id: uuid })
  }
}
