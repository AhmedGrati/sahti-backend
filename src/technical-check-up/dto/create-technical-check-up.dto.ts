import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTechnicalCheckUpDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  additionalInformation: string;
  @IsNotEmpty()
  patientId: number;
}
