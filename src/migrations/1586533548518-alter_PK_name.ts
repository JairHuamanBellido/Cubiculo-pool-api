import {MigrationInterface, QueryRunner} from "typeorm";

export class alterPKName1586533548518 implements MigrationInterface {
    name = 'alterPKName1586533548518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "code" TO "codigo"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_c5f78ad8f82e492c25d07f047a5" TO "PK_4521d4f486a8d544866e633537b"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_4521d4f486a8d544866e633537b" TO "PK_c5f78ad8f82e492c25d07f047a5"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "codigo" TO "code"`, undefined);
    }

}
