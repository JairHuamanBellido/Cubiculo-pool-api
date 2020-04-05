import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {


    constructor(private userService:UsersService){}

    @Get()
    async create(@Res() res:Response){
        const user =  await this.userService.create();

        res.json({user: user})
    }

}
