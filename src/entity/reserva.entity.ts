import {  Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Cubiculo } from "./cubiculo.entity";
import { User } from "./user.entity";
import { UserManyReserva } from "./userManyReservas.entity";

@Entity()
export class Reserva{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type =>Cubiculo ,  cubiculo=>cubiculo.id)
    cubiculo:Cubiculo

    @Column()
    fecha:Date

    @Column()
    hora_inicio:Date

    @Column()
    hora_fin:Date

    @Column()
    estado:string

    @Column()
    sede:string

    @OneToMany(type => UserManyReserva, userManyReserva=> userManyReserva.reserva)
  userManyReservas!: UserManyReserva[];

}