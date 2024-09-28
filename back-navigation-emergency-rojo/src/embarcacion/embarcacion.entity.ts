import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reporte } from '../reporte/reporte.entity';
@Entity({ name: 'embarcacion' })
export class Embarcacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  tipo_embarcacion: string;

  @Column()
  tipo_material: string;

  @Column('int')
  capacidad_maxima: number;

  @Column('int')
  peso_embarcacion: number;

  @Column('date')
  fecha_fabricacion: Date;

  @Column('int')
  cantidad_motor: number;

  @OneToMany(() => Reporte, (reporte) => reporte.embarcacion)
  reportes: Reporte[];
}
