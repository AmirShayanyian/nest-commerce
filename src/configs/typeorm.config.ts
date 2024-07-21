import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class TypeOrmConfigs implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
    return {
      type: 'mysql',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USERNAME,
      database: DB_DATABASE,
      password: DB_PASSWORD,
      synchronize: false,
      autoLoadEntities: false,
    };
  }
}
