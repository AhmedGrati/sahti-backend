import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OfficeFieldEnum } from '../../technician/entities/office-field.enum';

export class TechnicianSignUpDto {
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
