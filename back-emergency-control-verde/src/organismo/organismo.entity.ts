import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Organismo {
  @PrimaryColumn('uuid')
  codigo: string;
  @Column()
  nombre: string;
  @Column()
  correo: string;
  @Column()
  telefono: string;
}
