import { IsNotEmpty, IsOptional } from 'class-validator';

import { CreatePatientDto } from '../../patient/dto/create-patient.dto';
import { DoctorSignUpDto } from './doctor-sign-up-dto';
import { PharmacistSignUpDto } from './pharmacist-sign-up-dto';
import { TechnicianSignUpDto } from './technician-sign-up.dto';

export class SignUpDto {
  @IsNotEmpty()
  patient: CreatePatientDto;

  @IsOptional()
  doctor: DoctorSignUpDto;

  @IsOptional()
  pharmacist: PharmacistSignUpDto;

  @IsOptional()
  technician: TechnicianSignUpDto;
}
