import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { UserEntity } from '../auth/entities/user.entity';
import { CartItemEntity } from './entities/cart-item.entity';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, CartItemEntity,UserEntity])],
  controllers: [CartController],
  providers: [CartService, AuthService, TokenService, JwtService],
})
export class CartModule {}
