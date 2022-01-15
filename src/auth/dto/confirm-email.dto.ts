import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmEmailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}

export default ConfirmEmailDto;
