import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'JohnD1243' })
  username: string;

  @ApiProperty({ example: 'p12344Imdo123' })
  password: string;
}
