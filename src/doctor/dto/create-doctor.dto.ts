import { CreatePatientDto } from '../../patient/dto/create-patient.dto';
import { Column } from 'typeorm';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto extends CreatePatientDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  doctorNumber: number;

  @Column()
  @IsNotEmpty()
  @ApiProperty()
  grade: string;

  @IsNotEmpty()
  @ApiProperty()
  speciality: string;

  @IsNotEmpty()
  @ApiProperty()
  serviceHospital: string;

  @IsNotEmpty()
  @ApiProperty()
  officeLocalisation: string;
}
