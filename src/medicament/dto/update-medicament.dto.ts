import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicamentDto } from './create-medicament.dto';

export class UpdateMedicamentDto extends PartialType(CreateMedicamentDto) {}
