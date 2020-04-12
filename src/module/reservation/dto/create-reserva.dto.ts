import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateReservaDTO{


    @ApiProperty()
    @IsNotEmpty()
    fecha:Date;

    @IsNotEmpty()
    @ApiProperty()
    hora_inicio:Date;
    
    @IsNotEmpty()
    @ApiProperty()
    hora_fin:Date;
    
    @IsNotEmpty()
    @ApiProperty()
    sede:string;
    
    @IsNotEmpty()
    @ApiProperty()
    codigo_uno:string;
    
    @IsNotEmpty()
    @ApiProperty()
    codigo_dos:string;
    
    @IsNotEmpty()
    @ApiProperty()
    cubiculo_id:number;
}