import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { DenuncianteService } from './denunciante.service';
import { UpdateDenuncianteDto } from './dto/update-denunciante.dto';
import { ApiTags,ApiOperation } from '@nestjs/swagger';

@ApiTags('Denunciante')
@Controller('denunciante')
export class DenuncianteController {
  constructor(private denuncianteService: DenuncianteService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un denunciante' })
  findOne(@Param('id') id: string) {
    return this.denuncianteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar un denunciante' })
  update(
    @Param('id') id: string,
    @Body() updateDenuncianteDto: UpdateDenuncianteDto
  ) {
    return this.denuncianteService.update(id, updateDenuncianteDto);
  }
}
