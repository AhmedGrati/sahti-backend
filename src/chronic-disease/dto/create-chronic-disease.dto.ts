import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateChronicDiseaseDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
