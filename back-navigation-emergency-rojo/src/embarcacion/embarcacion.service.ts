import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Embarcacion } from './embarcacion.entity';
import { Repository } from 'typeorm';
import { CreateEmbarcacionDto } from './dto/create-embarcacion.dto';
import { UpdateEmbarcacionDto } from './dto/update-embarcacion.dto';

@Injectable()
export class EmbarcacionService {
  constructor(
    @InjectRepository(Embarcacion)
    private embarcacionRepository: Repository<Embarcacion>
  ) {}

  //Registrar una embarcacion
  async create(embarcacion: CreateEmbarcacionDto) {
    try {
      const newEmbarcacion = this.embarcacionRepository.create(embarcacion);

      return this.embarcacionRepository.save(newEmbarcacion);
    } catch (error) {
      console.error(HttpStatus.BAD_REQUEST, error);
    }
  }

  //Obtener todas las embarcaciones registradas en la DB
  gets() {
    return this.embarcacionRepository.find();
  }

  //Obtiene una embarcacion por un UUID
  async getByUUID(uuid: string) {
    const embarcacion_encontrada = await this.embarcacionRepository.findOne({
      where: {
        id: uuid,
      },
    });

    if (!embarcacion_encontrada) {
      //Si no se encuentra la embarcacion, entonces genera un error
      throw new HttpException(
        'la embarcacion no existe!!',
        HttpStatus.NOT_FOUND
      );
    }
    return embarcacion_encontrada;
  }

  //Elimina una embarcacion registrada
  async delete(uuid: string) {
    const embarcacion_encontrada = await this.embarcacionRepository.findOne({
      where: {
        id: uuid,
      },
    });

    if (!embarcacion_encontrada) {
      //Si no exsite la embarcacion
      throw new HttpException(
        'la embarcacion no existe!!',
        HttpStatus.NOT_FOUND
      );
    }
    return this.embarcacionRepository.delete({ id: uuid });
  }

  //Actualiza una embarcacion registrada
  async update(uuid: string, embarcacion: UpdateEmbarcacionDto) {
    const embarcacion_encontrada = await this.embarcacionRepository.findOne({
      where: {
        id: uuid,
      },
    });

    if (!embarcacion_encontrada) {
      throw new HttpException(
        'la embarcacion no existe!!',
        HttpStatus.NOT_FOUND
      );
    }

    const embarc_actualizada = Object.assign(
      embarcacion_encontrada,
      embarcacion
    );
    return this.embarcacionRepository.save(embarc_actualizada);
  }
}
