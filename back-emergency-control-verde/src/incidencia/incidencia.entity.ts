import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Operador } from '../operador/operador.entity';
import { Organismo } from '../organismo/organismo.entity';
import { Afectado } from '../afectado/afectado.entity';
import { Denunciante } from '../denunciante/denunciante.entity';

@Entity()
export class Incidencia {
  @PrimaryColumn('uuid')
  codigo: string;
  @CreateDateColumn()
  fecha: Date;
  @Column()
  tipo: string;
  @Column()
  lugar: string;
  @Column()
  cantidad_afectados: number;
  @Column()
  descripcion: string;
  @ManyToOne(() => Operador, (operador) => operador.incidencias, {
    eager: true,
  })
  operador: Operador;
  @ManyToMany(() => Organismo)
  @JoinTable()
  organismos: Organismo[];
  @OneToMany(() => Afectado, (afectado) => afectado.incidencia, {
    cascade: true,
    eager: true,
  })
  afectados: Afectado[];
  @OneToOne(() => Denunciante, (denunciante) => denunciante.incidencia, {
    cascade: true,
    eager: true,
  })
  denunciante: Denunciante;
}
