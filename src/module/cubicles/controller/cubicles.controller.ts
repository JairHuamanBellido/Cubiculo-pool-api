import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { CubiclesService } from '../services/cubicles.service';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('cubicles')
export class CubiclesController {

    constructor(private cubiclesServices:CubiclesService){}

    @ApiResponse({description: "Retorna todos los cubìculos disponibles",status: 200})
    @ApiQuery({required:true,description: "Fecha (AAAA-MM-DD)",name: "date"})
    @ApiQuery({required:true, description: "Hora de inicio (hh:00,  07 < hh < 22)", name: "startTime"})
    @ApiQuery({required: true, description: "Horas", name: "hours"})
    @Get()
    async findAvailablesCubicles(
        @Res() res:Response,
        @Query('date') date,
        @Query('startTime') startTime,
        @Query('hours') hours){

            try {
                const allCUbiculesAvailable =  await this.cubiclesServices.findCubicles(date,startTime,hours);

                res.json(allCUbiculesAvailable);
            } catch (error) {
                res.status(501).json({message: "Error en el servidor"})
            }

    }

}
