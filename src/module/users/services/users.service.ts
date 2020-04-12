import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequestDTO } from '../dto/createUserRequest.dto';
import {  AES} from "crypto-js";
import { secretKey } from '../../../key/key';

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}


    async create(_newUser:CreateUserRequestDTO){

        const isUserExist = await this.userRepository.findOne({where: {codigo:  _newUser.code}})
        
        if(!isUserExist){

            const newUser = await this.userRepository.create({
                codigo: _newUser.code,
                apellidos: _newUser.lastName,
                nombres: _newUser.name,
                password: AES.encrypt(_newUser.password,secretKey).toString()
            });
            await this.userRepository.save(newUser);    
            return {"message": "Usuario creado correctamente"};
        }

        else{
            return ErrorEvent;
        }


    }

}
