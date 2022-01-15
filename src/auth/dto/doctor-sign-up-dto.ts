import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Column } from 'typeorm';

export class DoctorSignUpDto {
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
