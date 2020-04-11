import { Controller, Post, Res, Body } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { Response } from 'express';
import { CreateReservaDTO } from '../dto/create-reserva.dto';

@Controller('reservation')
export class ReservationController {


    constructor(private reservarService:ReservationService){}


    @Post()
    async createReservation(@Res() res:Response, @Body() reserva:CreateReservaDTO){


        await this.reservarService.create(reserva);

        res.json({"message": "Funciona correctamente"})



    }
}
