import { CivilStatusEnum } from '../entities/civil-status.enum';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';
import { Gender } from '../entities/gender.entity';
import { RoleEnum } from '../entities/role.enum';

export class CreatePatientDto {
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: RoleEnum;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  @IsNumberString()
  @IsNotEmpty()
  @Length(8, 8)
  cin: string;

  @IsNotEmpty()
  gender: Gender;

  @IsOptional()
  @IsNumberString()
  @Length(8, 8)
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumberString()
  cnamId: number;

  @IsNotEmpty()
  civilStatus: CivilStatusEnum;

  @IsNotEmpty()
  socialStatus: string;
}
