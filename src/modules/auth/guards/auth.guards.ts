import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { isJWT } from 'class-validator';
import { Request } from 'express';
import { AuthMessages } from 'src/common/enums/messages.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    request.user = await this.authService.validateAccessToken(token);
    return true;
  }
  protected extractToken(req: Request) {
    const { authorization } = req.headers;
    if (!authorization || authorization?.trim() == '')
      throw new UnauthorizedException(AuthMessages.LoginRequired);
    const [bearer, token] = authorization.split(' ');
    if (
      !bearer ||
      bearer.toLocaleLowerCase() !== 'bearer' ||
      !token ||
      !isJWT(token)
    )
      throw new UnauthorizedException(AuthMessages.LoginRequired);
    return token;
  }
}
