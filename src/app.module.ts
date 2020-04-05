import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIGURATION } from './config/db.config';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIGURATION)],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
