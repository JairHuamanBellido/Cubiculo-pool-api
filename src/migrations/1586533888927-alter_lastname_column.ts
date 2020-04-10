import {MigrationInterface, QueryRunner} from "typeorm";

export class alterLastnameColumn1586533888927 implements MigrationInterface {
    name = 'alterLastnameColumn1586533888927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "lastName" TO "apellidos"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "apellidos" TO "lastName"`, undefined);
    }

}
