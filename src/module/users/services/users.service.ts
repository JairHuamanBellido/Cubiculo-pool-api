import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entity/user.entity';
import { Repository, In, MoreThanOrEqual, Equal, Not } from 'typeorm';
import { CreateUserRequestDTO } from '../dto/createUserRequest.dto';
import { AES } from "crypto-js";
import { secretKey } from '../../../key/key';
import { Reserva } from '../../../entity/reserva.entity';
import { UserManyReserva } from '../../../entity/userManyReservas.entity';
import *  as moment from 'moment';
import { CreateCubiculoDTO } from '../../../module/cubicles/dto/create-cubiculos.dto';
import { addPMorAM } from 'src/utils/algorithms';
import { UserHistoryReservations } from '../dto/createUserHistoryReservation.dto';
import { UserReservationsAvailables } from '../dto/createUserReservationsAvailables.dto';
@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Reserva)
        private reservaRepository: Repository<Reserva>,

        @InjectRepository(UserManyReserva)
        private userManyReservaRepository: Repository<UserManyReserva>
    ) { }


    async create(_newUser: CreateUserRequestDTO) {

        const isUserExist = await this.userRepository.findOne({ where: { codigo: _newUser.code } })

        if (!isUserExist) {

            const newUser = await this.userRepository.create({
                codigo: _newUser.code,
                apellidos: _newUser.lastName,
                nombres: _newUser.name,
                password: AES.encrypt(_newUser.password, secretKey).toString()
            });
            await this.userRepository.save(newUser);
            return { "message": "Usuario creado correctamente" };
        }

        else {
            return ErrorEvent;
        }

    }


    async findAllReservationsAvailableByStudent(code) {
        // Encontrar al usuario

        const user = await this.userRepository.findOneOrFail({ codigo: code })

        const reserva = await this.reservaRepository.find(
            {
                where: { estado: Not("Terminado"), fecha: MoreThanOrEqual(moment().format("YYYY-MM-DD")) },
                relations: ["cubiculo"]
            })



        // Encontrar las reservas del usuario
        const userManyReserva = await this.userManyReservaRepository.find(
            {
                where: { user: user, role: "Admin" },
                relations: ["reserva"]
            })


        const createCubiculosDTO: UserReservationsAvailables[] = [];

        userManyReserva.forEach((e, index) => {
            reserva.forEach((j) => {
                if (reserva[index] && j.id === e.reserva.id) {


                    createCubiculosDTO.push({
                        id: j.id,
                        name: j.cubiculo.nombre,
                        day: j.fecha.toString() === moment().format("YYYY-MM-DD").toString() ? "Hoy" : "Mañana",
                        startTime: addPMorAM(moment(e.reserva.hora_inicio).get("hours")),
                        endTime: addPMorAM(moment(e.reserva.hora_fin).get("hours")),
                        status: j.estado
                    })
                }

            })

        })
        return await createCubiculosDTO;
    }


    async findHoursAvailablePerDay(code: string, date) {
        // Encontrar al usuario
        let timeToReservation = " "
        if (date === "Hoy") {
            timeToReservation = moment().format('YYYY-MM-DD')

        }
        else if (date == "Mañana") {
            timeToReservation = moment().add(1, "days").format("YYYY-MM-DD")
        }


        const user = await this.userRepository.findOne({ codigo: code })
        if (!user) {
            Logger.error("Usuario no existe")

            return new ErrorEvent("qwe")
        }

        // Buscar todas las reservas del dia del usuario
        const reserva = await this.reservaRepository.findOne({ where: { fecha: timeToReservation } })


        const userManyReserva = await this.userManyReservaRepository.find({ where: { user: user, role: "Admin", reserva: reserva }, relations: ["reserva"] })


        if (userManyReserva.length) {

            const time = moment(userManyReserva[0].reserva.hora_inicio).get("hour");
            const time_fin = moment(userManyReserva[0].reserva.hora_fin).get("hour");
            return await 2 - (time_fin - time)

        }
        else {
            return await 2
        }

    }


    async findAllReservations(code) {
        const user = await this.userRepository.findOneOrFail({ codigo: code })

        const reserva = await this.reservaRepository.find(
            {
                where: { estado: "Terminado" },
                relations: ["cubiculo"]
            })




        const createUserHistoryReservations: UserHistoryReservations[] = [];

        // Encontrar las reservas del usuario
        const userManyReserva = await this.userManyReservaRepository.find(
            {
                where: { user: user },
                relations: ["reserva"]
            })

        Logger.log(reserva.length, "Reservas terminadas");
        Logger.log(userManyReserva.length, "Reservas many user terminadas");
        userManyReserva.forEach((e, index) => {
            reserva.forEach((j) => {
                if (j.id === e.reserva.id) {

                    createUserHistoryReservations.push({
                        id: j.id,
                        cubiculoName: j.cubiculo.nombre,
                        fecha: moment().format("DD-MM-YYYY"),
                        rol: e.role
                    })
                }

            })

        })


        return await createUserHistoryReservations;



    }

}
