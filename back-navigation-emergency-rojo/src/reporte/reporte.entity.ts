import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Embarcacion } from '../embarcacion/embarcacion.entity';
@Entity({ name: 'reporte' })
export class Reporte {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  fecha_reporte: Date;

  @Column()
  tipo_emergencia: string;

  @Column()
  latitud: number;

  @Column()
  longitud: number;

  @Column()
  descripcion: string;

  @Column()
  alertaId: string;

  @ManyToOne(() => Embarcacion, (embarcacion) => embarcacion.reportes)
  embarcacion: Embarcacion;

  @Column()
  embarcacionId: string;
}
