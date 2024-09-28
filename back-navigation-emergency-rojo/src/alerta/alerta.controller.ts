import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AlertaService } from './alerta.service';
import { Alerta } from './alerta.entity';
import { CreateAlertDto } from './dto/create-alert.dto';

@Controller('alerta')
@ApiTags('Alerta')
export class AlertaController {
  constructor(private alertService: AlertaService) {}

  //Listar todas las alertas
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las alertas registradas',
    type: Alerta,
    isArray: true,
  })
  gets(): Promise<Alerta[]> {
    return this.alertService.gets();
  }

  @Get('uuid')
  @ApiResponse({
    status: 200,
    description: 'Informacion de la alerta Solicitada',
  })
  @ApiNotFoundResponse({
    status: 400,
    description: 'La alerta no existe',
  })
  GetByUUID(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.alertService.getByUUID(uuid);
  }

  //Registrar una alerta asociada a un UUID de embarcacion
  @Post(':uuid/embarcacion')
  @ApiResponse({
    status: 201,
    description: 'La alerta se registró correctamente',
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
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Hubo un error interno del servidor al registrar la alerta',
  })
  @ApiBody({
    type: CreateAlertDto,
  })
  createAlert(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() alerta: CreateAlertDto
  ) {
    return this.alertService.create(uuid, alerta);
  }

  @Delete(':uuid')
  @ApiResponse({
    status: 200,
    description: 'La alerta se eliminó correctamente',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'La alerta no existe',
  })
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.alertService.delete(uuid);
  }

  @Get('embarcacion/:embarcacionId')
  @ApiResponse({
    status: 200,
    description: 'Informacion de la alerta y su embarcacion asociada',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No se encontró la embarcación',
  })
  getByEmbarcacionId(
    @Param('embarcacionId', ParseUUIDPipe) embarcacionId: string
  ) {
    return this.alertService.getByEmbarcacionUUId(embarcacionId);
  }
}
