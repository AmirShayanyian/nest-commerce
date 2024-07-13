import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { SignInValidation } from 'src/common/enums/messages.enum';

export class SignInDto {
  @IsNotEmpty({ message: SignInValidation.UsernameNotEmpty })
  @IsString()
  @Length(3, 25, { message: SignInValidation.UsernameLength })
  username: string;

  @IsNotEmpty({ message: SignInValidation.PasswordNotEmpty })
  @IsString()
  @Length(8, 32, { message: SignInValidation.PasswordLength })
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
