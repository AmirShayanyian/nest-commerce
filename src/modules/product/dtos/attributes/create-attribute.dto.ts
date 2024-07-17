import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DicDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}

export class CreateAttributeDto {
  @ApiPropertyOptional({ type: DicDto, isArray: true })
  attributes: DicDto[];

  @ApiProperty()
  productId: number;
}
