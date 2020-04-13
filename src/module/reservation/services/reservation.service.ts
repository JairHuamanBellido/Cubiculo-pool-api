import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from 'src/entity/reserva.entity';
import { Repository, MoreThan, Equal, Not, LessThan, MoreThanOrEqual, LessThanOrEqual, In } from 'typeorm';
import { CreateReservaDTO } from '../dto/create-reserva.dto';
import { Cubiculo } from '../../../entity/cubiculo.entity';
import { User } from '../../../entity/user.entity';
import { UserManyReserva } from "../../../entity/userManyReservas.entity";
import * as moment from "moment";
import { CreateCubiculoDTO } from '../dto/create-cubiculos.dto';
import { addPMorAM } from 'src/utils/algorithms';
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


        /**
         * 
         * @param _date  AAAA-MM-DD
         * @param _startTime HH:MM
         * @param _hours Int
         */
    async findCubicles(_date:any, _startTime:any, _hours:number) : Promise<CreateCubiculoDTO[]>{

        const startTime = moment().utc().format(`${_date}T${_startTime}:00`);

        const endHour = moment(startTime).add(_hours, 'hour').get("hour");

        const endTime = moment().utc().format(`${_date}T${endHour}:00:00`)

        /**
         * Busca todas las reservas que existen en los intervalos de hora establicadas en el parametros
         * para luego sacar los cubiculos que ya esta reservados y posteriormente sacar los id de los cubiculos
         * que estan ocupado
         */
        const allReservations = await this.reservaRepository.createQueryBuilder("reserva")
            .where("hora_inicio = :startTime", { startTime })
            .orWhere("hora_fin > :endTime", { endTime })
            .andWhere("hora_inicio < :endTime", { endTime })
            .orWhere("hora_fin > :startTime", { startTime })
            .andWhere("hora_inicio < :startTime", { startTime })
            .execute()

        /**
         * Busca todos los cubiculos en lo que sus id son distintos a los encontrados en la variable allReservations
         */
        const cubiculos = await this.cubiculoRepository.find({
            where: { id: Not(In((allReservations.length) ? allReservations.map(e => e.reserva_cubiculoId) : [0])) }
            , order: { id: "ASC" }
        })


        /**
         * DTO
         */
        const createCubiculosDTO: CreateCubiculoDTO[] = [];

        /**
         * Booleano para saber si la reserva es para hoy o mañana
         * true: mañana
         * false: hoy
         */
        const dayState = moment().isBefore(startTime);


        cubiculos.forEach(e => {
            createCubiculosDTO.push({
                id: e.id,
                name: e.nombre,
                day: (dayState) ? "Mañana" : "Hoy",
                startTime: addPMorAM(moment(startTime).get("hours")),
                endTime: addPMorAM(endHour),
            })
        })


        return createCubiculosDTO;
    }


    async create(_reserva: CreateReservaDTO) {



        try {


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




            await this.cubiculoRepository.save(cubiculoTarget);


            reserva.cubiculo = cubiculoTarget;
            reserva.estado = "Reservado";
            reserva.fecha = _reserva.fecha;
            reserva.hora_fin = _reserva.hora_fin;
            reserva.hora_inicio = _reserva.hora_inicio;
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
