import { IsNotEmpty } from 'class-validator';
import { OfficeFieldEnum } from '../../technician/entities/office-field.enum';

export class TechnicianSignUpDto {
  @IsNotEmpty()
  officeLocalisation: string;

  @IsNotEmpty()
  officeType: OfficeFieldEnum;

  @IsNotEmpty()
  workField: string;
}
