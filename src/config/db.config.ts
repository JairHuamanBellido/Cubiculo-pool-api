import {  config} from "dotenv";
import { User } from "../entity/user.entity";
import { ConnectionOptions } from "typeorm";
config();
 const DB_CONFIGURATION :ConnectionOptions = {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User],
    synchronize: false,
    logging: true,
    migrationsRun:true,
    migrationsTableName: 'migration',
    migrations: ['dist/migrations/*.js'],
    cli: {
        "entitiesDir": "dist/entity/*.js",
        "migrationsDir": "src/migrations"
    },
    
  
}

export =  DB_CONFIGURATION