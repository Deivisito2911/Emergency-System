import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrganismoService } from './organismo.service';
import { CreateOrganismoDto } from './dto/create-organismo.dto';
import { UpdateOrganismoDto } from './dto/update-organismo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Organismo')
@Controller('organismo')
export class OrganismoController {
  constructor(private readonly organismoService: OrganismoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo organismo' })
  create(@Body() createOrganismoDto: CreateOrganismoDto) {
    return this.organismoService.create(createOrganismoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los organismos' })
  findAll() {
    return this.organismoService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Obtener un organismo mediante el codigo' })
  findOne(@Param('codigo', new ParseUUIDPipe()) codigo: string) {
    return this.organismoService.findOne(codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Modificar un organismo' })
  update(
    @Param('codigo', new ParseUUIDPipe()) codigo: string,
    @Body() updateOrganismoDto: UpdateOrganismoDto
  ) {
    return this.organismoService.update(codigo, updateOrganismoDto);
  }
}
