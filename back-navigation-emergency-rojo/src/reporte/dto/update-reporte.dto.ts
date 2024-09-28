import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReporteDto {
  @IsDate()
  @ApiProperty({
    type: Date,
    description: 'fecha_reporte',
  })
  fecha_reporte?: Date;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'tipo_emergencia',
  })
  tipo_emergencia?: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'latitud',
  })
  latitud?: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'longitud',
  })
  longitud?: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'descripcion',
  })
  descripcion?: string;
}