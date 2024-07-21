import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ControllerName } from 'src/common/enums/controller.enum';
import { CartService } from '../services/cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuards } from 'src/modules/auth/guards/auth.guard';
import { Request } from 'express';

@Controller(ControllerName.Cart)
@ApiTags('Cart')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuards)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  create(@Req() req: Request) {
    const { id } = req.user;
    return this.cartService.cartExistByUserId(id);
  }
}
