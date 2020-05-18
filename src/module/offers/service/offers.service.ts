import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from 'src/entity/reserva.entity';
import {
    Repository,
    MoreThanOrEqual,
    LessThan,
    LessThanOrEqual,
} from 'typeorm';
import { OfertaCubiculo } from 'src/entity/ofertaCubiculo.entity';
import { CreateOfferReservationDTO } from '../dto/create-offer.dto';
import * as moment from 'moment';
import { CreateOfferReponseDTO } from '../dto/create-offerResponse.dto';
import { addPMorAM } from 'src/utils/algorithms';
import { CreateOfferDetailDTO } from '../dto/create-offerDetail.dto';
@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Reserva)
        private reservaRepository: Repository<Reserva>,

        @InjectRepository(OfertaCubiculo)
        private ofertaRepository: Repository<OfertaCubiculo>,
    ) {}

    async createOffer(offer: CreateOfferReservationDTO) {
        const reserva = await this.reservaRepository.findOne({
            where: { id: offer.reservaId },
        });

        const nuevaOferta = new OfertaCubiculo();

        nuevaOferta.apple = offer.apple;
        nuevaOferta.pizarra = offer.pizarra;
        nuevaOferta.reserva = reserva;
        nuevaOferta.sitios = offer.sitios;
        nuevaOferta.disponible = true;
        await this.reservaRepository.save(reserva);
        await this.ofertaRepository.save(nuevaOferta);

        return true;
    }


    async findById(id:number){
        const offer =  await this.ofertaRepository.findOne({where: {id: id}})
        const reserva =  await this.reservaRepository.findOne({where:{id:offer.reserva.id}, relations: ['cubiculo']})

        let offerDetail =  new CreateOfferDetailDTO();
        offerDetail.appleTv  = offer.apple;
        offerDetail.asientos =  offer.sitios;
        offerDetail.pizarra =  offer.pizarra;
        offerDetail.cubiculoNombre =  reserva.cubiculo.nombre
    
        return offerDetail;
    }

    async getAllOffesAvailable() {
        const offers = await this.ofertaRepository.find({
            where: { disponible: true },
            relations: ['reserva'],
        });
        const reserva = await this.reservaRepository.find({
            where: { estado: 'Activado' },
            relations: ['cubiculo'],
        });
        let result: CreateOfferReponseDTO[] = [];

        offers.forEach(offer => {
            reserva.forEach(e => {
                if (offer.reserva.id === e.id) {
                    result.push({
                        apple: offer.apple,
                        pizarra: offer.pizarra,
                        asientos: offer.sitios,
                        cubiculoNombre: e.cubiculo.nombre,
                        horaInicio: addPMorAM(
                            moment(e.hora_inicio).get('hours'),
                        ),
                        horaFin: addPMorAM(moment(e.hora_fin).get('hours')),
                        tema: e.theme,
                    });
                }
            });
        });

        return result;
    }
}
