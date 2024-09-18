import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ type: 'string', example: 'Good product with high quality' })
  text: string;

  @ApiProperty({ type: 'double', example: 4.6 })
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  productId: number;
}
