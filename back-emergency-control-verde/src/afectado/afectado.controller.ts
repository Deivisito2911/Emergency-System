 import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { AfectadoService } from './afectado.service';
import { UpdateAfectadoDto } from './dto/update-afectado.dto';
import { ApiTags,ApiOperation } from '@nestjs/swagger';

@ApiTags('Afectado')
@Controller('afectado')
export class AfectadoController {
  constructor(private afectadoService: AfectadoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los afectados' })
  findAll() {
    return this.afectadoService.findAll();
 }
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.afectadoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Obtener un afectado mediante el Id' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAfectadoDto: UpdateAfectadoDto
  ) {
    return this.afectadoService.update(id, updateAfectadoDto);
  }
}
