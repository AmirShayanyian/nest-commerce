import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { SignUpValidation } from 'src/common/enums/messages.enum';

export class SignUpto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty({ message: SignUpValidation.UsernameNotEmpty })
  @IsString()
  @Length(3, 25, { message: SignUpValidation.UsernameLength })
  username: string;

  @IsNotEmpty({ message: SignUpValidation.PasswordNotEmpty })
  @IsString()
  @Length(8, 32, { message: SignUpValidation.PasswordLength })
  @ApiProperty({ type: 'string' })
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(3, 25)
  first_name: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(3, 25)
  last_name: string;

  @ApiPropertyOptional()
  @IsEmail()
  @Length(5, 35)
  email: string;
}
