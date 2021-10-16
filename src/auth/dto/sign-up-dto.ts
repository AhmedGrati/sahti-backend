import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDetailDto } from '../../user-details/dto/create-user-detail.dto';
import { CreatePatientDto } from '../../patient/dto/create-patient.dto';
import { CreateDoctorDto } from '../../doctor/dto/create-doctor.dto';
import { CreatePharmacistDto } from '../../pharmacist/dto/create-pharmacist.dto';
import { CreateTechnicianDto } from '../../technician/dto/create-technician.dto';

export class SignUpDto {
  @IsNotEmpty()
  userDetail: CreateUserDetailDto;

  @IsOptional()
  patient: CreatePatientDto;

  @IsOptional()
  doctor: CreateDoctorDto;

  @IsOptional()
  pharmacist: CreatePharmacistDto;

  @IsOptional()
  technician: CreateTechnicianDto;
}
