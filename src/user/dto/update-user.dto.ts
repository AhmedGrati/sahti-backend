import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsDateString,
  IsEmail,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';
import { Gender } from '../entities/gender.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional() firstName: string;

  @IsOptional() lastName: string;

  @IsOptional()
  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNumberString()
  @IsOptional()
  @Length(8, 8)
  cin: string;

  @IsOptional() gender: Gender;

  @IsOptional()
  @IsNumberString()
  @Length(8, 8)
  phoneNumber: string;

  @IsOptional()
  password: string;
}
