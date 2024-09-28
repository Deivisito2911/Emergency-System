import { uuid } from 'uuidv4';
import { IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAlertDto {
  @IsUUID()
  id = uuid();

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Descripcion de la alerta emitida por la embarcacion',
    examples: [
      'Necesito ayuda, he chocado con una roca',
      'Un pasajero cayó al mar',
      'Hay un incendio en la embarcacion',
      'La embarcacion se quedo sin combustible',
    ],
  })
  descripcion: string;
}
