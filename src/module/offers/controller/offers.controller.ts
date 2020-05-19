import { Controller, Post, Res, Body, Get, Param, Put } from '@nestjs/common';
import { OffersService } from '../service/offers.service';
import { Response } from 'express';
import { CreateOfferReservationDTO } from '../dto/create-offer.dto';
import { JoinReservationDTO } from '../dto/create-joinReservation.dto';

@Controller('offers')
export class OffersController {


    constructor(private offerService:OffersService){}



    @Get()
    async getAllAvailableOffer(
        @Res() res:Response,
        
    ){
        try {
            const result = await this.offerService.getAllOffesAvailable() 
            res.json(result)
        } catch (error) {
            res.json({"error": "error"})
        }
    }


    @Get(":id")
    async findById(@Res() res:Response, @Param("id") id:number){
        try {
            const result =  await this.offerService.findById(id);
            res.json(result)
        } catch (error) {
            res.status(500).json({"error": "Hubo un error"})
        }
    }
    @Post()
    async makeOffer(@Res() res:Response, @Body() offert:CreateOfferReservationDTO){
        try {
            const result = await this.offerService.createOffer(offert);
            
            res.json({"message": "Reservado"})
        } catch (error) {
            res.status(500).json({"error": "Hubo un error"})
        }
    }

    @Post("invitation")
    async joinReservationOffer(@Res() res:Response, @Body() joinReservation:JoinReservationDTO){
        try {
            console.log(joinReservation)
            const result =  await this.offerService.joinReservation(joinReservation);
            res.json({"message": "Se ha unido con exito a la reserva"})
        } catch (error) {
            res.status(500).json({"error": "Hubo un error"})
        }
    }

}
