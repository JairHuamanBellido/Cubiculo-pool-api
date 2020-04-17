import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { CubiclesService } from '../services/cubicles.service';

@Controller('cubicles')
export class CubiclesController {

    constructor(private cubiclesServices:CubiclesService){}
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
