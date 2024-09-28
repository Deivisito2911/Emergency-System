import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  titulo!: string;

  @Column()
  tipoIncendio!: string;

  @Column()
  prioridad!: string;

  @Column()
  magnitud!: string;

  @Column()
  estatus!: string;

  @Column()
  depBomberos!: string;

  @Column({ nullable: true })
  telefonoReportante?: string;

  @Column({ nullable: true })
  nombreReportante?: string;

  @Column({ nullable: true })
  notas?: string;

  @Column('double')
  latitud!: number;

  @Column('double')
  longitud!: number;
}

export default Incident;
