import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Incidencia } from '../incidencia/incidencia.entity';

@Entity()
export class Operador {
  @PrimaryColumn()
  cedula: string;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  fecha_de_nacimiento: Date;
  @Column()
  sexo: string;
  @Column({ unique: true })
  telefono: string;
  @Column({ unique: true })
  correo: string;
  @Column()
  fecha_de_contratacion: Date;
  @Column()
  direccion: string;
  @Column()
  telefono_fijo: string;
  @OneToMany(() => Incidencia, (incidencia) => incidencia.operador)
  incidencias: Incidencia[];
}
