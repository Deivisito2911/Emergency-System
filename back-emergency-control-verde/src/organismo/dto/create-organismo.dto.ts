import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganismoDto {
  @ApiProperty({example : 'Bomberos'})
  @IsString()
  nombre: string;

  @ApiProperty({example : '04160989202'})
  @IsPhoneNumber()
  telefono: string;

  @ApiProperty({example : 'correoserio29112002@gmail.com'})
  @IsEmail()
  correo: string;

  @ApiProperty({example : 'ABCDE123457'})
  @IsString()
  codigo: string;
}
