import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TypeOrmConfigs } from 'src/configs/typeorm.config';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigs,
      inject: [TypeOrmConfigs],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    AuthModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [TypeOrmConfigs, JwtService],
})
export class AppModule {}
