import { CivilStatusEnum } from '../entities/civil-status.enum';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';
import { Gender } from '../entities/gender.entity';

export class CreatePatientDto {
  userDetailId: number;

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
