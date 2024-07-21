import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemEntity } from '../entities/cart-item.entity';
import { NotFoundMessages, PublicMessages } from 'src/common/enums/messages.enum';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity) private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity) private cartItemRepository: Repository<CartItemEntity>
  ) {}

  async createCart(userId: number) {
    const cart = await this.cartExistByUserId(userId);
    if (cart)
      return {
        message: PublicMessages.Duplicate,
      };
    await this.cartRepository.insert({ userId });
    return {
      message: PublicMessages.Created,
    };
  }

  async addProductToCart() {}

  async cartExistByUserId(userId: number) {
    const cart = await this.cartRepository.findOneBy({ userId });
    if (cart) return cart;
    throw new NotFoundException(NotFoundMessages.CartNotFoundForUser);
  }
}
