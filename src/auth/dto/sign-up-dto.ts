import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { CreatePatientDto } from '../../patient/dto/create-patient.dto';
import { DoctorSignUpDto } from './doctor-sign-up-dto';
import { PharmacistSignUpDto } from './pharmacist-sign-up-dto';
import { TechnicianSignUpDto } from './technician-sign-up.dto';

export class SignUpDto {
  @IsNotEmpty()
  @ApiProperty()
  patient: CreatePatientDto;

  @IsOptional()
  @ApiProperty()
  doctor: DoctorSignUpDto;

  @IsOptional()
  @ApiProperty()
  pharmacist: PharmacistSignUpDto;

  @IsOptional()
  @ApiProperty()
  technician: TechnicianSignUpDto;
}
