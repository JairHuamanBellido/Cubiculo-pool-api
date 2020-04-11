import { Module } from '@nestjs/common';
import { ReservationService } from './services/reservation.service';
import { ReservationController } from './controller/reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from '../../entity/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}
