import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { CartService } from '../services/cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuards } from 'src/modules/auth/guards/auth.guard';
import { Request } from 'express';
import { AddProductToCartDto } from '../dtos/add-product.dto';

@Controller(ControllerName.Cart)
@ApiTags('Cart')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuards)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/add-to-cart')
  addToCart(@Req() req: Request, @Body() addToCartDto: AddProductToCartDto) {
    const { id: userId } = req.user;
    return this.cartService.addProductToCart(addToCartDto, userId);
  }
}
