import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthMessages } from 'src/common/enums/messages.enum';
import { AccessTokenPayload } from 'src/common/types/payload';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  createAccessToken(payload: AccessTokenPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: 60 * 2,
    });
  }

  verifyAccessToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException(AuthMessages.TryAgain);
    }
  }
}
