import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  accessToken: string;
}
