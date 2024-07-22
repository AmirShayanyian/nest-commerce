import { EntityName } from 'src/common/enums/entity.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class $npmConfigName1721559542224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createTable(
    //   new Table({
    //     name: EntityName.User,
    //     columns: [
    //       {
    //         name: 'id',
    //         type: 'integer',
    //         isPrimary: true,
    //         isGenerated: true,
    //         generationStrategy: 'increment',
    //       },
    //       {
    //         name: 'first_name',
    //         type: 'varchar(30)',
    //         isNullable: true,
    //       },
    //       {
    //         name: 'last_name',
    //         type: 'varchar(30)',
    //         isNullable: true,
    //       },
    //       {
    //         name: 'username',
    //         type: 'varchar(30)',
    //         isUnique: true,
    //       },
    //       {
    //         name: 'password',
    //         type: 'varchar',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'email',
    //         type: 'varchar(50)',
    //         isNullable: true,
    //       },
    //     ],
    //   }),
    //   true
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropTable(EntityName.User);
  }
}
