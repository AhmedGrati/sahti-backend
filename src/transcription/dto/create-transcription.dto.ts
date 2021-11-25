import { IsNotEmpty } from 'class-validator';

export class CreateTranscriptionDto {
  remarks: string;
  @IsNotEmpty()
  medicamentsIdList: number[];
}
