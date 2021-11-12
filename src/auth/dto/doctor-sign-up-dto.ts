import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Column } from 'typeorm';

export class DoctorSignUpDto {
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
