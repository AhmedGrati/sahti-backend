import { OfficeFieldEnum } from '../entities/office-field.enum';
import { IsNotEmpty } from 'class-validator';
import { CreatePatientDto } from '../../patient/dto/create-patient.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnicianDto extends CreatePatientDto {
  @IsNotEmpty()
  @ApiProperty()
  officeLocalisation: string;

  @IsNotEmpty()
  @ApiProperty()
  officeType: OfficeFieldEnum;

  @IsNotEmpty()
  @ApiProperty()
  workField: string;
}
