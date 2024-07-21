import { ApiProperty } from '@nestjs/swagger';

export class AddProductToCartDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  skuId: number;
}
