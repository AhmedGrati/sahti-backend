import { CreatePatientDto } from '../../patient/dto/create-patient.dto';
import { Column } from 'typeorm';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateDoctorDto extends CreatePatientDto {
  @IsNotEmpty()
  @IsNumberString()
  doctorNumber: number;

  @Column()
  @IsNotEmpty()
  grade: string;

  @IsNotEmpty()
  speciality: string;

  @IsNotEmpty()
  serviceHospital: string;

  @IsNotEmpty()
  officeLocalisation: string;
}
