import { uuid } from 'uuidv4';
import { IsUUID, IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEmbarcacionDto {
  @IsUUID()
  id = uuid();

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Nombre',
    examples: [
      'Titanic',
      'Costa Concordia',
      'Navibus',
      'Gran Cacique',
      'Conferry',
    ],
  })
  nombre: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Tipo de Embarcacion',
    examples: [
      'Velero',
      'Crucero',
      'Portacontenedores',
      'Bote Pesquero',
      'Carga de Pasajeros',
    ],
  })
  tipo_embarcacion: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Tipo de Material',
    examples: ['Madera', 'Fibra de Vidrio', 'Ferrocemento', 'Aluminio'],
  })
  tipo_material: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Capacidad maxima de carga',
    examples: ['500t', '600t', '200t', '120t', '800kg'], //t: toneladas, kg: kilogramos
  })
  capacidad_maxima: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Peso de la Embarcacion',
    examples: ['600t', '900t', '500kg', '450t', '200t'],
  })
  peso_embarcacion: number;

  @IsDate()
  @ApiProperty({
    type: Date,
    description: 'Fecha de creacion',
    examples: ['2000-02-23', '1998-12-10', '2012-10-20'],
  })
  fecha_fabricacion: Date;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Cantidad de Motores',
    examples: [2, 3, 4, 5],
  })
  cantidad_motor: number;
}
