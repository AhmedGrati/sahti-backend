import { BloodType } from '../entities/blood-type.enum';

export class CreateMedicalRecordDto {
  patientId: number;
  bloodType: BloodType;
}
