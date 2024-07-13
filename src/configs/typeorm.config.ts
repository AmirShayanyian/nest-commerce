import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class TypeOrmConfigs implements TypeOrmOptionsFactory {
  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const {
      DB_AUTO_LOAD,
      DB_SYNC,
      DB_HOST,
      DB_PORT,
      DB_USERNAME,
      DB_PASSWORD,
      DB_DATABASE,
    } = process.env;
    return {
      type: 'mysql',
      host: DB_HOST,
      port: 4942,
      username: DB_USERNAME,
      database: DB_DATABASE,
      password: DB_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
