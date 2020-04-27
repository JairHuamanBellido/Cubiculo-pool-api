import { ApiProperty } from "@nestjs/swagger";

export class ReservaDetailDTO{

    @ApiProperty()
    cubiculoNombre:string;
    
    @ApiProperty()
    sede:string;
    
    @ApiProperty()
    horaInicio:string;
    
    @ApiProperty()
    horaFin:string;
    
    @ApiProperty()
    participantes:any[]
    
    @ApiProperty()
    tema:string;
    
    @ApiProperty()
    sitiosDisponible:number;
    
    @ApiProperty()
    estado:string;

    constructor(){}
}