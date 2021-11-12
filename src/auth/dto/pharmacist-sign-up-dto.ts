import { IsNotEmpty } from 'class-validator';

export class PharmacistSignUpDto {
  @IsNotEmpty()
  pharmacyLocalisation: string;
}
