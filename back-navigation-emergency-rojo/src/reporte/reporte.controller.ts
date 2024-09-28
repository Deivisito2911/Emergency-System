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
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ReporteService } from './reporte.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { Reporte } from './reporte.entity';

@Controller('reporte')
@ApiTags('Reporte')
export class ReporteController {
  constructor(private reporteService: ReporteService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'El reporte se registro correctamente'
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Los campos introducidos son incorrectos o falta una propiedad'
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No existe la alerta o la embarcacion'
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error interno del servidor al registrar el reporte'
  })
  @ApiBody({
    type: CreateReporteDto
  })
  create(@Body() reporte: CreateReporteDto) {
    return this.reporteService.create(reporte);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los reportes registrados',
    type: Reporte,
    isArray: true
  })
  gets() {
    return this.reporteService.gets();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    description: 'Informacion del reporte solicitado'
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No existe el reporte'
  })
  get(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.reporteService.getByUUID(uuid);
  }

  @Delete(':uuid')
  @ApiResponse({
    status: 200,
    description: 'El reporte se eliminó correctamente'
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'El reporte no existe'
  })
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.reporteService.delete(uuid);
  }

  @Patch(':uuid')
  @ApiResponse({
    status: 200,
    description: 'El reporte se actualizó correctamente'
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Los campos introducidos son incorrectos o falta una propiedad'
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'El reporte no existe'
  })
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() reporte: UpdateReporteDto
  ) {
    return this.reporteService.update(uuid, reporte);
  }
}