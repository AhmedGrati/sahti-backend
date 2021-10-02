import { Gender } from '../entities/gender.entity';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

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
  password: string;
}
