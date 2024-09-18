import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TypeOrmConfig } from 'src/configs/typeorm.config';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { JwtService } from '@nestjs/jwt';
import { ProductModule } from '../product/product.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig()),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    AuthModule,
    CategoryModule,
    ProductModule,
    CartModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {}
