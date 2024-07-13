import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ApiTags } from '@nestjs/swagger';
import { SignUpto } from './dtos/sign-up.dto';

@ApiTags('Auth')
@Controller(ControllerName.Auth)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  signUp(@Body() signUpDto: SignUpto) {
    
  }
}
