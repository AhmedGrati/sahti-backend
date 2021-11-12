import { CreatePatientDto } from '../../patient/dto/create-patient.dto';
import { IsNotEmpty } from 'class-validator';

export class CreatePharmacistDto extends CreatePatientDto {
  @IsNotEmpty()
  pharmacyLocalisation: string;
}
