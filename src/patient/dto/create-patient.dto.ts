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
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreatePatientDto {
  // id: number;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  role: RoleEnum;

  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  birthday: Date;

  @IsNumberString()
  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 8)
  cin: string;

  @IsNotEmpty()
  @ApiProperty()
  gender: Gender;

  @IsOptional()
  @IsNumberString()
  @ApiProperty()
  @Length(8, 8)
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  cnamId: number;

  @IsNotEmpty()
  @ApiProperty()
  civilStatus: CivilStatusEnum;

  @IsNotEmpty()
  @ApiProperty()
  socialStatus: string;
}
