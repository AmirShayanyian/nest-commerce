import { ApiProperty } from '@nestjs/swagger';

export class CreateVoteDto {
  @ApiProperty({ type: 'boolean', required: true })
  like: boolean;

  @ApiProperty({ type: 'integer', required: true })
  reviewId: number;
}
