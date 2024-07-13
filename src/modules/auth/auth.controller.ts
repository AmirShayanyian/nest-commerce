import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SignUpto } from './dtos/sign-up.dto';
import { SwaggerConsumer } from 'src/common/enums/swagger-consumer.enum';

@ApiTags('Auth')
@Controller(ControllerName.Auth)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiConsumes(SwaggerConsumer.Json, SwaggerConsumer.UrlEncoded)
  signUp(@Body() signUpDto: SignUpto) {
    return this.authService.signUp(signUpDto);
  }
}
