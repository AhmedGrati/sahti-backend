import { AuthTokenStrategy } from './auth-token-strategy.interface';
import { ConfigService } from '@nestjs/config';

export class ConfirmationTokenStrategy implements AuthTokenStrategy {
  constructor(private readonly configService: ConfigService) {}

  getExpirationTime(): string {
    return `${this.configService.get(
      'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
    )}s`;
  }

  getSecret(): string {
    return this.configService.get('JWT_VERIFICATION_TOKEN_SECRET');
  }
}
