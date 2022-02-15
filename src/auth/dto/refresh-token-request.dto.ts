import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}
