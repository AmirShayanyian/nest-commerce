import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ControllerName } from 'src/common/enums/controller.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller(ControllerName.Auth)
export class AuthController {
  constructor(private authService: AuthService) {}
}
