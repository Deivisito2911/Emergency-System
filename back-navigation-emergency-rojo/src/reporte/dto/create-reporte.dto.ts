import { uuid } from 'uuidv4';
import { IsString, IsDate, IsUUID, IsNumber } from 'class-validator';
import {} from '@nestjs/typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReporteDto {
  @IsUUID()
  Id_reporte = uuid();

  @IsDate()
  @ApiProperty({
    type: Date,
    description: 'fecha_reporte',
  })
  fecha_reporte: Date;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'tipo_emergencia',
  })
  tipo_emergencia: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'latitud',
  })
  latitud: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'longitud',
  })
  longitud: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'descripcion',
  })
  descripcion: string;

  @IsUUID()
  @ApiProperty({
    default: 'UUID',
    description: 'embarcacionId',
  })
  embarcacionId: string;

  @IsUUID()
  @ApiProperty({
    default: 'UUID',
    description: 'alertaId',
  })
  alertaId: string;
}
