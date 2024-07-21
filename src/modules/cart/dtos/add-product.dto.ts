import { ApiProperty } from '@nestjs/swagger';

export class AddProductToCartDto {
  @ApiProperty()
  cartId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  skuId: number;
}
