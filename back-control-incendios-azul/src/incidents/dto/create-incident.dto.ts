import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { IncidentEstatus } from '../../enums/incidents-estatus.enum';
import { IncidentType } from '../../enums/incidents-type.enum';
import { IncidentPriority } from '../../enums/incidents-priority.enum';
import { IncidentMagnitude } from '../../enums/incidents-magnitude.enum';

export class CreateIncidentDto {
  @ApiProperty({ example: 'Incendio en el bosque' })
  @IsString()
  titulo!: string;

  @ApiProperty({ enum: IncidentType, example: IncidentType.FORESTAL })
  @IsEnum(IncidentType)
  tipoIncendio!: IncidentType;

  @ApiProperty({ enum: IncidentPriority, example: IncidentPriority.HIGH })
  @IsEnum(IncidentPriority)
  prioridad!: IncidentPriority;

  @ApiProperty({ enum: IncidentMagnitude, example: IncidentMagnitude.TOTAL })
  @IsEnum(IncidentMagnitude)
  magnitud!: IncidentMagnitude;

  @ApiProperty({ enum: IncidentEstatus, example: IncidentEstatus.ACUDIENDO })
  @IsEnum(IncidentEstatus)
  estatus!: IncidentEstatus;

  @ApiProperty({ example: 'Mariño' })
  @IsString()
  depBomberos!: string;

  @ApiProperty({ example: '1234567890', required: false })
  @IsOptional()
  @IsString()
  telefonoReportante?: string;

  @ApiProperty({ example: 'Juan Perez', required: false })
  @IsOptional()
  @IsString()
  nombreReportante?: string;

  @ApiProperty({ example: 'Incendio en progreso', required: false })
  @IsOptional()
  @IsString()
  notas?: string;

  @ApiProperty({ example: 10.987654 })
  @IsNumber()
  latitud!: number;

  @ApiProperty({ example: -74.123456 })
  @IsNumber()
  longitud!: number;
}
