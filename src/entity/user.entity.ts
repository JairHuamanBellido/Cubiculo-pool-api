import { Entity, Column,  PrimaryColumn } from 'typeorm';


@Entity()
export class User {



  @PrimaryColumn()
  codigo:string;
  
  @Column()
  nombres:string;

  @Column()
  apellidos:string;
  
  @Column()
  password:string;



}