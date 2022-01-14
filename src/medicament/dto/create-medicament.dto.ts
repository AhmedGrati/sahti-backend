import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMedicamentDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
