import {MigrationInterface, QueryRunner} from "typeorm";

export class addDataCubiculo1586546684479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {


        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 01',6,true) `);
        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 02',6,true) `);

        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 03',6,true) `);

        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 04',6,true) `);
        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 05',6,true) `);

        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 06',6,true) `);
        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 07',6,true) `);
        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 08',6,true) `);
        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 09',6,true) `);
        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 10',6,true) `);
        await queryRunner.query(`INSERT INTO "cubiculo"(nombre, sitios_disponibles, disponible) VALUES('Cubiculo 11',6,true) `);

        
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
