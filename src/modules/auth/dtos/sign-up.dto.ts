import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { SignUpValidation } from 'src/common/enums/messages.enum';

export class SignUpto {
  @IsNotEmpty({ message: SignUpValidation.UsernameNotEmpty })
  @IsString()
  @Length(3, 25, { message: SignUpValidation.UsernameLength })
  username: string;

  @IsNotEmpty({ message: SignUpValidation.PasswordNotEmpty })
  @IsString()
  @Length(8, 32, { message: SignUpValidation.PasswordLength })
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
