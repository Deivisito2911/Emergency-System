import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Incidencia } from '../incidencia/incidencia.entity';
@Entity()
export class Denunciante {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  cedula: string;
  @Column()
  nombre: string;
  @Column()
  telefono: string;
  @OneToOne(() => Incidencia, (incidencia) => incidencia.denunciante)
  @JoinColumn()
  incidencia: Incidencia;
}
