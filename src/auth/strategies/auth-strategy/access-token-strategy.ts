import { AuthTokenStrategy } from './auth-token-strategy.interface';
import { ConfigService } from '@nestjs/config';

export class AccessTokenStrategy implements AuthTokenStrategy {
  constructor(private readonly configService: ConfigService) {}
  getSecret(): string {
    return this.configService.get('JWT_LOGIN_TOKEN_SECRET');
  }

  getExpirationTime(): string {
    return `${this.configService.get('JWT_LOGIN_TOKEN_EXPIRATION_TIME')}s`;
  }
}
