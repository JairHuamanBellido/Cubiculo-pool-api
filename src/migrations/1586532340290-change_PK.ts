import {MigrationInterface, QueryRunner} from "typeorm";

export class changePK1586532340290 implements MigrationInterface {
    name = 'changePK1586532340290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_c5f78ad8f82e492c25d07f047a5" PRIMARY KEY ("code")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_c5f78ad8f82e492c25d07f047a5"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`, undefined);
    }

}
