import { ApiProperty } from '@nestjs/swagger';
import { CreateAfectadoDto } from '../../afectado/dto/create-afectado.dto';
import { CreateDenuncianteDto } from '../../denunciante/dto/create-denunciante.dto';
import {
  IsDefined,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { tiposIncidencia } from '../const/tiposIncidencia';

export class CreateIncidenciaDto {
  @ApiProperty()
  @IsUUID()
  codigo: string;

  @ApiProperty({ example: 'Naufragio' })
  @IsString()
  @IsIn(Array.from(tiposIncidencia.keys()))
  tipo: string;

  @ApiProperty({ example: 'Villa Rosa' })
  @IsString()
  lugar: string;

  @ApiProperty({
    example: 'Barco volo desde la bahia hacia villa rosa y hay niños llorando',
  })
  @IsString()
  @MaxLength(250)
  descripcion: string;

  @ApiProperty({ example: '0' })
  @IsInt()
  cantidad_afectados: number;

  @ApiProperty()
  @IsDefined()
  denunciante: CreateDenuncianteDto;

  @ApiProperty()
  @IsOptional()
  afectados: CreateAfectadoDto[];
}
