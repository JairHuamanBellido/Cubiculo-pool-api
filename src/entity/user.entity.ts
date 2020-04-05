import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('rowid')
    id: number;


  @Column()
  code:string;
  
  @Column()
  name:string;

  @Column()
  lastName:string;
  
  @Column()
  password:string;

}