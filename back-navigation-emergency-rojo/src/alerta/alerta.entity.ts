import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Embarcacion } from '../embarcacion/embarcacion.entity';
@Entity({ name: 'alerta' })
export class Alerta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descripcion: string;

  @OneToOne(() => Embarcacion) //Relacion 1 a 1 entre alerta y embarcacion
  @JoinColumn()
  embarcacion: Embarcacion;
}
