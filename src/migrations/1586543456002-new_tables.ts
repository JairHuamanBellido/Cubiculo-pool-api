import {MigrationInterface, QueryRunner} from "typeorm";

export class newTables1586543456002 implements MigrationInterface {
    name = 'newTables1586543456002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cubiculo" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "sitios_disponibles" integer NOT NULL, "disponible" boolean NOT NULL, CONSTRAINT "PK_3bf2c308f39dd057ddd6b8bfeb9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "reserva" ("id" SERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL, "hora_inicio" TIMESTAMP NOT NULL, "hora_fin" TIMESTAMP NOT NULL, "estado" character varying NOT NULL, "sede" character varying NOT NULL, "cubiculoId" integer, CONSTRAINT "PK_37909c9a3ea6a72ee6f21b16129" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_many_reserva" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "userCodigo" character varying, "reservaId" integer, CONSTRAINT "PK_21f9eb468f68b63ce78162b8b00" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "reserva" ADD CONSTRAINT "FK_1ae62de3afdcea8522545a53849" FOREIGN KEY ("cubiculoId") REFERENCES "cubiculo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_many_reserva" ADD CONSTRAINT "FK_785043c423087bdb1fcc48ac29b" FOREIGN KEY ("userCodigo") REFERENCES "user"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_many_reserva" ADD CONSTRAINT "FK_5c5b71607f3fd666f6b13e6929c" FOREIGN KEY ("reservaId") REFERENCES "reserva"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_many_reserva" DROP CONSTRAINT "FK_5c5b71607f3fd666f6b13e6929c"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_many_reserva" DROP CONSTRAINT "FK_785043c423087bdb1fcc48ac29b"`, undefined);
        await queryRunner.query(`ALTER TABLE "reserva" DROP CONSTRAINT "FK_1ae62de3afdcea8522545a53849"`, undefined);
        await queryRunner.query(`DROP TABLE "user_many_reserva"`, undefined);
        await queryRunner.query(`DROP TABLE "reserva"`, undefined);
        await queryRunner.query(`DROP TABLE "cubiculo"`, undefined);
    }

}
