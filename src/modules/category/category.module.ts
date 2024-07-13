import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../auth/token.service';
import { UserEntity } from '../auth/entities/user.entity';
import { ProductEntity } from '../product/entities/prodcut.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, UserEntity, ProductEntity]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, TokenService, AuthService, JwtService],
})
export class CategoryModule {}
