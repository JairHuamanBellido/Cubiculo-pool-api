import { Controller, Post, Res, Body, Get, Query } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { Response, json } from 'express';
import { CreateReservaDTO } from '../dto/create-reserva.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CreateCubiculoDTO } from '../dto/create-cubiculos.dto';

@Controller('reservation')
export class ReservationController {


    constructor(private reservarService: ReservationService) { }



    @Get()
    @ApiResponse({description: "Listar todos los cubículos disponibles",status: 200, type: CreateCubiculoDTO,})
    async findCubicles(
        @Res() res: Response,
        @Query('date') date,
        @Query('startTime') startTime,
        @Query('hours') hours) {
        try {
            const allCubicles = await this.reservarService.findCubicles(date, startTime, hours);

            return res.json(allCubicles);

        } catch (error) {
            res.status(404).json({ message: "No se encontraron resultados" })
        }
    }


    @ApiResponse({ description: "Registro de una reserva", status: 201 })
    @Post()
    async createReservation(@Res() res: Response, @Body() reserva: CreateReservaDTO) {

        try {
            const response = await this.reservarService.create(reserva);
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Hubo un error al reservar" })
        }
    }
}
