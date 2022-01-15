import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalCheckUpDto } from './create-medical-check-up.dto';

export class UpdateMedicalCheckUpDto extends PartialType(
  CreateMedicalCheckUpDto,
) {}
