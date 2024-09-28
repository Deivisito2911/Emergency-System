import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmbarcacionService } from './embarcacion.service';
import { Embarcacion } from './embarcacion.entity';
import { CreateEmbarcacionDto } from './dto/create-embarcacion.dto';
import { UpdateEmbarcacionDto } from './dto/update-embarcacion.dto';

@Controller('embarcacion')
@ApiTags('Embarcacion')
export class EmbarcacionController {
  constructor(private embarcacionService: EmbarcacionService) {}

  //Registrar una embarcacion
  @Post()
  @ApiCreatedResponse({
    description: 'La embarcacion se registro correctamente',
  })
  @ApiBadRequestResponse({
    status: 400,
    description:
      'Los campos introducidos son incorrectos o falta una propiedad',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error interno del servidor al registrar la embarcacion',
  })
  @ApiBody({
    type: CreateEmbarcacionDto,
  })
  create(@Body() newEmbarcacion: CreateEmbarcacionDto) {
    return this.embarcacionService.create(newEmbarcacion);
  }

  //Listar todas las embarcaciones registrada en la Base de Datos
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las embarcaciones registradas',
    type: Embarcacion,
    isArray: true,
  })
  gets(): Promise<Embarcacion[]> {
    return this.embarcacionService.gets();
  }

  //Obtener una embarcacion por un UUID
  @Get(':uuid')
  @ApiResponse({
    status: 200,
    description: 'Informacion de la embarcacion solicitada',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'La embarcacion no existe',
  })
  getByUUID(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.embarcacionService.getByUUID(uuid);
  }

  //Eliminar una embarcacion por un UUID
  @Delete(':uuid')
  @ApiResponse({
    status: 200,
    description: 'La embarcacion se elimino correctamente',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'La embarcacion no existe',
  })
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.embarcacionService.delete(uuid);
  }

  //Actualizar una embarcacion por un UUID (No es necesario actualizar obligatoriamente todos los campos)
  @Patch(':uuid')
  @ApiResponse({
    status: 200,
    description: 'La embarcacion se actualizo correctamente',
  })
  @ApiBadRequestResponse({
    status: 400,
    description:
      'Los campos introducidos son incorrectos o falta una propiedad',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'La embarcacion no existe',
  })
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() embarcacion: UpdateEmbarcacionDto
  ) {
    return this.embarcacionService.update(uuid, embarcacion);
  }
}