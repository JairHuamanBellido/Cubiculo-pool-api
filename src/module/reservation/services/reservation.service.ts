import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from 'src/entity/reserva.entity';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { CreateReservaDTO } from '../dto/create-reserva.dto';
@Injectable()
export class ReservationService {

    constructor(
        @InjectRepository(Reserva)
        private reservaRepository: Repository<Reserva>
    ) { }


    async create(_reserva: CreateReservaDTO) {


        const a =  await this.reservaRepository.find({where:{fecha: MoreThan(new Date())} })
     
    }




}
