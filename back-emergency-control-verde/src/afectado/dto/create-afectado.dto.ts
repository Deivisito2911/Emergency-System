import {
  MaxLength,
  IsAlphanumeric,
  IsString,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAfectadoDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({example : 'V30156789'})
  @IsAlphanumeric()
  cedula: string;

  @ApiProperty({example : 'Sebastian'})
  @IsString()
  nombre: string;

  @ApiProperty({example : '2002-11-29T14:33:23.588Z'})
  @IsDateString()
  fecha_de_nacimiento: Date;

  @ApiProperty({example : 'Mata'})
  @IsString()
  apellido: string;

  @ApiProperty({example : 'Masculino'})
  @IsString()
  sexo: string;

  @ApiProperty({example : 'Mocho de la pierna derecha'})
  @IsString()
  @MaxLength(250)
  afecciones: string;

  @ApiProperty({example : 'Convulsionando'})
  @IsString()
  estado: string;

  @ApiProperty({example : 'ORH+'})
  @IsString()
  tipo_sangre: string;
}
