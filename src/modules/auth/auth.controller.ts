import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SignUpto } from './dtos/sign-up.dto';
import { SwaggerConsumer } from 'src/common/enums/swagger-consumer.enum';
import { SignInDto } from './dtos/sign-in.dto';

@ApiTags('Auth')
@Controller(ControllerName.Auth)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  @ApiConsumes(SwaggerConsumer.Json, SwaggerConsumer.UrlEncoded)
  signUp(@Body() signUpDto: SignUpto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  @ApiConsumes(SwaggerConsumer.Json, SwaggerConsumer.UrlEncoded)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
