import { OfficeFieldEnum } from '../entities/office-field.enum';
import { IsNotEmpty } from 'class-validator';
import { CreatePatientDto } from '../../patient/dto/create-patient.dto';

export class CreateTechnicianDto extends CreatePatientDto {
  @IsNotEmpty()
  officeLocalisation: string;

  @IsNotEmpty()
  officeType: OfficeFieldEnum;

  @IsNotEmpty()
  workField: string;
}
