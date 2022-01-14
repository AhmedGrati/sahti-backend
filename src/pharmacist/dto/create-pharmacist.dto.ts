import { CreatePatientDto } from '../../patient/dto/create-patient.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePharmacistDto extends CreatePatientDto {
  @IsNotEmpty()
  @ApiProperty()
  pharmacyLocalisation: string;
}
