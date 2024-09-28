import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes,UseGuards } from '@nestjs/common';
import { FireIncidentsService } from './fire-incidents.service';
import { ValidateIncidentPipe } from '../pipes/validate-incident.pipe';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('fire-incidents')
@Controller('fire-incidents')
export class FireIncidentsController {
  constructor(private readonly fireIncidentsService: FireIncidentsService) {}


  @Get('/markers')
  async getInfoMarkers() {
    return await this.fireIncidentsService.getInfoMarkers();
  }

  @Get(':id')
  async getIncident(@Param('id') id: string) {
    return await this.fireIncidentsService.getIncident(id);
  } 

  @Post()
  @UsePipes(new ValidateIncidentPipe())
  @ApiOperation({ summary: 'Crear un nuevo incidente de incendio' })
  async createIncident(@Body() createIncidentDto: CreateIncidentDto) {
    return this.fireIncidentsService.createIncident(createIncidentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un incidente de incendio' })
  async updateIncident(@Param('id') id: string, @Body() updateIncidentDto: UpdateIncidentDto) {
    return await this.fireIncidentsService.updateIncident(id, updateIncidentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los incidentes de incendio' })
  async getAllIncidents() {
    return await this.fireIncidentsService.getAllIncidents();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un incidente de incendio' })
  async deleteIncident(@Param('id') id: string) {
    return await this.fireIncidentsService.deleteIncident(id);
  }
}
