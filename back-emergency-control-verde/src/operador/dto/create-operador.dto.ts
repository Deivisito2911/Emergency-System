import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOperadorDto {
  @ApiProperty({example : 'V28564281'})
  @IsAlphanumeric()
  cedula: string;

  @ApiProperty({example : 'Deivith'})
  @IsString()
  nombre: string;

  @ApiProperty({example : 'Zanella'})
  @IsString()
  apellido: string;

  @ApiProperty({example : '2002-11-29T14:33:23.588Z'})
  @IsDateString()
  fecha_de_nacimiento: Date;

  @ApiProperty({example : '2023-07-13T14:33:23.588Z'})
  @IsDateString()
  fecha_de_contratacion: Date;

  @ApiProperty({example : 'Masculino'})
  @IsString()
  sexo: string;

  @ApiProperty({example : '04267866798'})
  @IsPhoneNumber()
  telefono: string;

  @ApiProperty({example : 'correoserio29112002@gmail.com'})
  @IsEmail()
  correo: string;

  @ApiProperty({example : 'Porlamar, calle campos diagonal al jumbo'})
  @IsString()
  direccion: string;

  @ApiProperty({example : '02952613569'})
  @IsPhoneNumber()
  telefono_fijo: string;
}
