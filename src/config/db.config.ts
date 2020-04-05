import {  TypeOrmModuleOptions} from "@nestjs/typeorm";
import {  config} from "dotenv";
import { User } from "../users/entity/user.entity";
config();
export const DB_CONFIGURATION :TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User],
    synchronize: true,
    autoLoadEntities: true,
    logging: true
    
  
}