import { PartialType } from '@nestjs/mapped-types';
import { CreatePharmacistDto } from './create-pharmacist.dto';

export class UpdatePharmacistDto extends PartialType(CreatePharmacistDto) {}
