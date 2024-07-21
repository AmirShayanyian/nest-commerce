import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemEntity } from '../entities/cart-item.entity';
import { BadRequestMessages, NotFoundMessages, PublicMessages } from 'src/common/enums/messages.enum';
import { NotFoundError } from 'rxjs';
import { AddProductToCartDto } from '../dtos/add-product.dto';
import { UserEntity } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity) private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity) private cartItemRepository: Repository<CartItemEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async addProductToCart(addToCartDto: AddProductToCartDto, userId: number) {
    const { productId, skuId } = addToCartDto;
    let { cart } = await this.userRepository.findOneBy({ id: userId });
    if (!cart) {
      cart = await this.resolveCartByUserId(userId);
    }
    const item = this.cartItemRepository.create({ productId, cartId: cart.id, skuId });
    await this.cartItemRepository.save(item);
    const total = await this.countTotalItems(cart.id);
    await this.cartRepository.update({ id: cart.id }, { total });
    return {
      message: PublicMessages.Created,
    };
  }

  async resolveCartByUserId(userId: number) {
    const cart = await this.cartRepository.findOneBy({ userId });
    if (cart) {
      return cart;
    }
    const createdCart = await this.cartRepository.create({ userId });
    await this.cartRepository.save(createdCart);
    return createdCart;
  }

  async countTotalItems(cartId: number) {
    const count = await this.cartItemRepository.count({
      where: {
        cartId,
      },
    });
    return count;
  }
}
