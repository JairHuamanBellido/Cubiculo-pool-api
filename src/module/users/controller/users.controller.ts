import { Controller, Get, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserRequestDTO } from '../dto/createUserRequest.dto';
import { ApiResponse, ApiConflictResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {


    constructor(private userService: UsersService) { }


    @ApiResponse({description: "Registro de usuario con éxito",status: 201})
    @ApiConflictResponse({description: "Usuario ya registrado", status: 409})
    @Post()
    async create(@Res() res: Response, @Body() createUser: CreateUserRequestDTO) {
        console.log(createUser);
        try {
            const user = await this.userService.create(createUser);

            res.json(user)
        } catch (error) {
            res.status(409).json({ message: "Usuario ya existe" })
        }

    }

}
