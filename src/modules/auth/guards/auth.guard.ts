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
import { SKIP_AUTH } from 'src/common/decorators/skip-auth.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSkippedAuthorization = this.reflector.get<boolean>(
      SKIP_AUTH,
      context.getHandler()
    );
    if (isSkippedAuthorization) return true;
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
