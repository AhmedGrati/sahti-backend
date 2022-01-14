import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTranscriptionDto {
  @ApiProperty()
  remarks: string;
  @ApiProperty()
  @IsNotEmpty()
  medicamentsIdList: number[];
}
