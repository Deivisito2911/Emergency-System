import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { OperadorService } from './operador.service';
import { CreateOperadorDto } from './dto/create-operador.dto';
import { UpdateOperadorDto } from './dto/update-operador.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Operador')
@Controller('operador')
export class OperadorController {
  constructor(private operadorService: OperadorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un operador' })
  create(@Body() createOperadorDto: CreateOperadorDto) {
    return this.operadorService.create(createOperadorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los operadores' })
  findAll() {
    return this.operadorService.findAll();
  }

  @Get(':cedula')
  @ApiOperation({ summary: 'Obtener un operador mediante la cedula' })
  findOne(@Param('cedula') cedula: string) {
    return this.operadorService.findOne(cedula);
  }

  @Get(':correo')
  @ApiOperation({
    summary: 'Obetener el nombre de un operador mediante correo',
  })
  getCorreo(@Param('correo') correo: string) {
    return this.operadorService.getCorreo(correo);
  }

  @Patch(':cedula')
  @ApiOperation({ summary: 'Modificar operador' })
  update(
    @Param('cedula') cedula: string,
    @Body() updateOperadorDto: UpdateOperadorDto
  ) {
    return this.operadorService.update(cedula, updateOperadorDto);
  }
}
