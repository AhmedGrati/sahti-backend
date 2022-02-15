import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicalCheckUpDto } from './create-technical-check-up.dto';

export class UpdateTechnicalCheckUpDto extends PartialType(
  CreateTechnicalCheckUpDto,
) {}
