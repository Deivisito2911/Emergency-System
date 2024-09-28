import {
  IsAlphanumeric,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDenuncianteDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({example : 'V28564281'})
  @IsAlphanumeric()
  cedula: string;

  @ApiProperty({example : 'Deivith Zanella'})
  @IsString()
  nombre: string;

  @ApiProperty({example : '04267866798'})
  @IsPhoneNumber()
  telefono: string;
}
