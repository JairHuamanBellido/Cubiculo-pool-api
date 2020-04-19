import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from '../../../entity/reserva.entity';
import { Repository } from 'typeorm';
import { CreateReservaDTO } from '../dto/create-reserva.dto';
import { Cubiculo } from '../../../entity/cubiculo.entity';
import { User } from '../../../entity/user.entity';
import { UserManyReserva } from "../../../entity/userManyReservas.entity";
import  *  as moment from "moment";
@Injectable()
export class ReservationService {

    constructor(
        @InjectRepository(Reserva)
        private reservaRepository: Repository<Reserva>,

        @InjectRepository(Cubiculo)
        private cubiculoRepository: Repository<Cubiculo>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(UserManyReserva)
        private userManyReservaRepository: Repository<UserManyReserva>
    ) { }



    async create(_reserva: CreateReservaDTO) {



        try {
            /**
             *  Entrada de los tiempos del body -> hh:mm (16:00)
             *  La variable creada acontinuaciòn parsea el tiempo a formato UTC
             *  aaaa-mm-ddThh:mm:mil
             * 
             * Ejemplo: 16:00 el dia 2020-04-15    -->  2020-04-15T16:00:00
             * 
             */

            
            const UTC_StartTime = `${_reserva.fecha}T${_reserva.hora_inicio}:00`;
            
            
            const UTC_EndTime = `${_reserva.fecha}T${_reserva.hora_fin}:00`;            
            

            const UTC_Date = `${_reserva.fecha}T${_reserva.hora_inicio}:00`;
            

            const reserva = new Reserva();


            const cubiculoTarget = await this.cubiculoRepository.findOne({ id: _reserva.cubiculo_id })

            const usuario_owner_1 = await this.userRepository.findOne({ codigo: _reserva.codigo_uno });

            const usuario_owner_2 = await this.userRepository.findOne({ codigo: _reserva.codigo_dos });


            const many_to_many_1 = new UserManyReserva();

            many_to_many_1.role = "Admin";
            many_to_many_1.user = usuario_owner_1;


            const many_to_many_2 = new UserManyReserva();

            many_to_many_2.role = "Admin";
            many_to_many_2.user = usuario_owner_2;


            reserva.cubiculo = cubiculoTarget;
            reserva.estado = "Reservado";
            reserva.fecha = new Date(UTC_Date);
            reserva.hora_fin = new Date(UTC_EndTime);
            reserva.hora_inicio = new Date(UTC_StartTime);
            reserva.sede = _reserva.sede;

            await this.reservaRepository.save(reserva);

            many_to_many_2.reserva = reserva;
            many_to_many_1.reserva = reserva;

            await this.userManyReservaRepository.save(many_to_many_1);

            await this.userManyReservaRepository.save(many_to_many_2);

            return { "message": "Reserva realizada con èxito" }
        } catch (e) {
            return ErrorEvent;
        }
    }




}
