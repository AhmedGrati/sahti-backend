import { AuthTokenStrategy } from './auth-token-strategy.interface';
import { ConfigService } from '@nestjs/config';

export class RefreshTokenStrategy implements AuthTokenStrategy {
  constructor(private readonly configService: ConfigService) {}

  getExpirationTime(): string {
    return `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`;
  }

  getSecret(): string {
    return this.configService.get('JWT_REFRESH_TOKEN_SECRET');
  }
}
