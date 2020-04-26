import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequestDTO } from '../dto/createUserRequest.dto';
import {  AES} from "crypto-js";
import { secretKey } from '../../../key/key';
import { Reserva } from '../../../entity/reserva.entity';
import { UserManyReserva } from '../../../entity/userManyReservas.entity';
import *  as moment from 'moment';
@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Reserva)
        private reservaRepository:Repository<Reserva>,

        @InjectRepository(UserManyReserva)
        private userManyReservaRepository: Repository<UserManyReserva>
    ){}


    async create(_newUser:CreateUserRequestDTO){
        
        const isUserExist = await this.userRepository.findOne({where: {codigo:  _newUser.code}})
        
        if(!isUserExist){

            const newUser = await this.userRepository.create({
                codigo: _newUser.code,
                apellidos: _newUser.lastName,
                nombres: _newUser.name,
                password: AES.encrypt(_newUser.password,secretKey).toString()
            });
            await this.userRepository.save(newUser);    
            return {"message": "Usuario creado correctamente"};
        }

        else{
            return ErrorEvent;
        }

    }

    async findHoursAvailablePerDay(code:string,date){
        // Encontrar al usuario
        let timeToReservation  =" "
        if(date === "Hoy"){
            timeToReservation = moment().format('YYYY-MM-DD')

        }
        else if(date=="Mañana"){
            timeToReservation =  moment().add(1,"days").format("YYYY-MM-DD")
        }


        const user =  await this.userRepository.findOne({codigo: code})
        if(!user){
            Logger.error("Usuario no existe")
            
            return new ErrorEvent("qwe")
        }

        // Buscar todas las reservas del dia del usuario
        const reserva =  await this.reservaRepository.findOne({where: {fecha:timeToReservation}})


        const  userManyReserva =  await this.userManyReservaRepository.find({where: {user:user, role: "Admin", reserva: reserva}, relations: ["reserva"]})


        if (userManyReserva.length){

            const time =  moment( userManyReserva[0].reserva.hora_inicio).get("hour");
            const time_fin =  moment( userManyReserva[0].reserva.hora_fin).get("hour");
            return await 2-(time_fin-time)

        }
        else{
            return await 2
        }



    }

}
