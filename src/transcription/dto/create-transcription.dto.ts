import { IsNotEmpty } from 'class-validator';

export class CreateTranscriptionDto {
  additionalInformation: string;
  @IsNotEmpty()
  medicamentsIdList: number[];
}
