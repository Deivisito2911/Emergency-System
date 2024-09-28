import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  ParseUUIDPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IncidenciaService } from './incidencia.service';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LogsService } from '../logs/logs.service';

@ApiTags('Incidencias')
@Controller('incidencia')
export class IncidenciaController {
  constructor(
    private readonly incidenciaService: IncidenciaService,
    private readonly logService: LogsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva incidencia' })
  create(@Body() createIncidenciaDto: CreateIncidenciaDto) {
    return this.incidenciaService.create(createIncidenciaDto);
  }
  @Get()
  @ApiOperation({ summary: 'Obtener todas las incidencias' })
  findAll() {
    return this.incidenciaService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Obtener una incidencia, mediante el codigo' })
  findOne(@Param('codigo', new ParseUUIDPipe()) codigo: string) {
    try {
      return this.incidenciaService.findOne(codigo);
    } catch (error) {
      this.logService.error(error);
      throw new InternalServerErrorException(
        'conseguir la incidencia ha fallado'
      );
    }
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Modificar una incidencia' })
  update(
    @Param('codigo', new ParseUUIDPipe()) codigo: string,
    @Body() UpdateIncidenciaDto: UpdateIncidenciaDto
  ) {
    try {
      return this.incidenciaService.update(codigo, UpdateIncidenciaDto);
    } catch (error) {
      throw new NotFoundException('Recurso no encontrado', {
        cause: error,
        description: error.message,
      });
    }
  }
}
