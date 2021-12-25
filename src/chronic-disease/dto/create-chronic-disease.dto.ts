import { IsNotEmpty } from 'class-validator';

export class CreateChronicDiseaseDto {
  @IsNotEmpty()
  name: string;
}
