import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PharmacistSignUpDto {
  @IsNotEmpty()
  @ApiProperty()
  pharmacyLocalisation: string;
}
