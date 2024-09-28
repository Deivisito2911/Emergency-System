import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Incidencia } from '../incidencia/incidencia.entity';

@Entity()
export class Afectado {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  cedula: string;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  fecha_de_nacimiento: Date;
  @Column()
  sexo: string;
  @Column({ length: 250 })
  afecciones: string;
  @Column()
  estado: string;
  @Column()
  tipo_sangre: string;
  @ManyToOne(() => Incidencia, (incidencia) => incidencia.afectados)
  incidencia: Incidencia;
}
