import {MigrationInterface, QueryRunner} from "typeorm";

export class addThemeReservaton1587947791906 implements MigrationInterface {
    name = 'addThemeReservaton1587947791906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" ADD "theme" character varying NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva" DROP COLUMN "theme"`, undefined);
    }

}
