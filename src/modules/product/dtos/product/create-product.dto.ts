import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  summary: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  price: number;

  @ApiProperty({ required: true })
  categoryId: number;
}
