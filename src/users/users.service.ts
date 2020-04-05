import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}


    async create(){

        const newUser = await this.userRepository.create({code:'u201413797', name: "Jair"})
        await this.userRepository.save(newUser);

        return newUser;
    }

}
