import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIGURATION } from './config/db.config';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthService } from './module/auth/services/auth.service';
@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIGURATION), UsersModule, AuthModule],

  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
