import {MigrationInterface, QueryRunner} from "typeorm";

export class alterNameColumn1586533802866 implements MigrationInterface {
    name = 'alterNameColumn1586533802866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "nombre" TO "nombres"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "nombres" TO "nombre"`, undefined);
    }

}
