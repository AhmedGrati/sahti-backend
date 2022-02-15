import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordConfirmDto {
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
