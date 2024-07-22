import { EntityName } from 'src/common/enums/entity.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class $npmConfigName1721559542224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //-- User Table --
    await queryRunner.createTable(
      new Table({
        name: EntityName.User,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'first_name',
            type: 'varchar(30)',
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar(30)',
            isNullable: true,
          },
          {
            name: 'username',
            type: 'varchar(30)',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(50)',
            isNullable: true,
          },
        ],
      }),
      true
    );
    //-- end of user Table --
    //-- Product Table --
    await queryRunner.createTable(
      new Table({
        name: EntityName.Product,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'summary',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'numeric',
          },
          {
            name: 'categoryId',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
      true
    );
    //-- end of product Table --
    //-- Category Table --
    await queryRunner.createTable(
      new Table({
        name: EntityName.Category,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(25)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropTable(EntityName.User, true);
    // await queryRunner.dropTable(EntityName.Product, true);
    await queryRunner.dropTable(EntityName.Category, true);
  }
}
