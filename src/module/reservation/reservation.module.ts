import { Module } from '@nestjs/common';
import { ReservationService } from './services/reservation.service';
import { ReservationController } from './controller/reservation.controller';

@Module({
  providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}
