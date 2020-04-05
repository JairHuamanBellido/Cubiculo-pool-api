import { User } from "../../../entity/user.entity";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthResponseDTO{
    @ApiProperty()
    name:string;

    @ApiProperty()
    lastName:string;
    
    @ApiProperty()
    code:string;
    constructor(user:User){
        this.name  = user.name;
        this.lastName =  user.lastName,
        this.code =  user.code;
    }
}