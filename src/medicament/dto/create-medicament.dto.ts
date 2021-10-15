import { IsNotEmpty } from 'class-validator';

export class CreateMedicamentDto {
  @IsNotEmpty()
  name: string;
}
