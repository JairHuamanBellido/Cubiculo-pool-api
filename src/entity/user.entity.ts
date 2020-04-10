import { Entity, Column,  PrimaryColumn } from 'typeorm';


@Entity()
export class User {



  @PrimaryColumn()
  code:string;
  
  @Column()
  nombre:string;

  @Column()
  lastName:string;
  
  @Column()
  password:string;



}