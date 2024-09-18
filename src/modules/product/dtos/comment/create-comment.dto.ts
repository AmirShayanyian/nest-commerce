import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  reviewId: number;

  @ApiPropertyOptional()
  parentId: number;
}
