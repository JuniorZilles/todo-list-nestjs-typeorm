import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class Migrations1657308260232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'cpf',
            isUnique: true,
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'birthday',
            isNullable: false,
            type: 'date'
          },
          {
            name: 'email',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'password',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'address',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'city',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'state',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'country',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'zipCode',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'zipCode',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'description',
            isNullable: false,
            type: 'varchar'
          },
          {
            name: 'date',
            isNullable: false,
            type: 'date'
          },
          {
            name: 'userId',
            type: 'uuid'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
    await queryRunner.dropTable('user');
  }
}
