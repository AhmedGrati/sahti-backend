import { IsNotEmpty } from 'class-validator';

export class RefreshTokenRequestDto {
  @IsNotEmpty()
  refreshToken: string;
}
