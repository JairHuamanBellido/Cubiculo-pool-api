import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from 'src/entity/reserva.entity';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { CreateReservaDTO } from '../dto/create-reserva.dto';
import { Cubiculo } from '../../../entity/cubiculo.entity';
import { User } from '../../../entity/user.entity';
import { UserManyReserva } from "../../../entity/userManyReservas.entity";
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
        private userManyReservaRepository:Repository<UserManyReserva>
    ) { }


    async create(_reserva: CreateReservaDTO) {



        try{

        
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


        cubiculoTarget.disponible = false;


        await this.cubiculoRepository.save(cubiculoTarget);


        reserva.cubiculo = cubiculoTarget;
        reserva.estado = "Reservado";
        reserva.fecha = _reserva.fecha;
        reserva.hora_fin = _reserva.hora_fin;
        reserva.hora_inicio = _reserva.hora_inicio;
        reserva.sede = _reserva.sede;

        await this.reservaRepository.save(reserva);

        many_to_many_2.reserva =  reserva;
        many_to_many_1.reserva =  reserva;
        
        await this.userManyReservaRepository.save(many_to_many_1);

        await this.userManyReservaRepository.save(many_to_many_2);

        return {"message": "Reserva realizada con èxito"}
        }catch(e ){
            return ErrorEvent;
        }
    }




}
