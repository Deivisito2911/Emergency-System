import { Entity, Column } from 'typeorm';

@Entity({ name: 'order' })
export class Order {
    @Column()
    id: string 

    @Column()
    Token: string

    /*@Column('date')
    update_time: Date

    @Column()
    payerName: string

    @Column()
    payerEmail: string

    @Column()
    payerId: string*/
}