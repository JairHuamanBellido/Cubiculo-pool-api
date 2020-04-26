import { Controller, Post, Res, Body, Get, Query, Logger } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { Response, json } from 'express';
import { CreateReservaDTO } from '../dto/create-reserva.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('reservation')
export class ReservationController {


    constructor(private reservarService: ReservationService) { }





    @ApiResponse({ description: "Registro de una reserva", status: 201 })
    @Post()
    async createReservation(@Res() res: Response, @Body() reserva: CreateReservaDTO) {

        try {
            const response = await this.reservarService.create(reserva);
            res.json(response);
            Logger.log(`${reserva.codigo_uno} ha reservado un cubículo`, 'Reservation Activity')
        } catch (error) {
            res.status(500).json({ message: "Hubo un error al reservar" })
            Logger.error(`Hubo error al reservar`,'Reservation Activity')
        }
    }
}
