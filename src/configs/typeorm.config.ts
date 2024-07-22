import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();
config({ path: join(process.cwd(), '.env') });

export function TypeOrmConfig(): TypeOrmModuleOptions {
  const { DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;
  return {
    type: 'mysql',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    autoLoadEntities: false,
    synchronize: false,
    entities: ['dist/**/**/**/*.entity{.ts,.js}', 'dist/**/**/*.entity{.ts,.js}'],
  };
}
