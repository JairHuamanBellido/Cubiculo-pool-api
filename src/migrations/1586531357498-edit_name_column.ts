import {MigrationInterface, QueryRunner} from "typeorm";

export class editNameColumn1586531357498 implements MigrationInterface {
    name = 'editNameColumn1586531357498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "nombre"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "nombre" TO "name"`, undefined);
    }

}
