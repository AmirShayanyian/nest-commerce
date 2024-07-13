import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  password: string;

  @IsString()
  @Length(3, 25)
  first_name: string;

  @IsString()
  @Length(3, 25)
  last_name: string;

  @IsEmail()
  @Length(5, 35)
  email: string;
}
