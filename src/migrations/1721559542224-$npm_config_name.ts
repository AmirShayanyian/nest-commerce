import { EntityName } from "src/common/enums/entity.enum";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class $npmConfigName1721559542224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //-- User Table --
    await queryRunner.createTable(
      new Table({
        name: EntityName.User,
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "first_name",
            type: "varchar(30)",
            isNullable: true,
          },
          {
            name: "last_name",
            type: "varchar(30)",
            isNullable: true,
          },
          {
            name: "username",
            type: "varchar(30)",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar(50)",
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
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar(75)",
            isNullable: false,
          },
          {
            name: "summary",
            type: "varchar(200)",
            isNullable: true,
          },
          {
            name: "description",
            type: "text",
            isNullable: false,
          },
          {
            name: "price",
            type: "numeric",
          },
          {
            name: "categoryId",
            type: "integer",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
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
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar(25)",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "slug",
            type: "varchar",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
          },
        ],
      }),
      true
    );
    //-- end of category table --
    //-- Attribute Table --
    await queryRunner.createTable(
      new Table({
        name: EntityName.ProductAttribute,
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "key",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "value",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropTable(EntityName.User, true);
    // await queryRunner.dropTable(EntityName.Product, true);
    await queryRunner.dropTable(EntityName.Category, true);
  }
}
