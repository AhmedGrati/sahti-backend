import { ApiProperty } from '@nestjs/swagger';
import { BloodType } from '../entities/blood-type.enum';

export class CreateMedicalRecordDto {
  @ApiProperty()
  patientId: number;
  @ApiProperty()
  bloodType: BloodType;
}
