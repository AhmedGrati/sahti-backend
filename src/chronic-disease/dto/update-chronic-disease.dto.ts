import { PartialType } from '@nestjs/mapped-types';
import { CreateChronicDiseaseDto } from './create-chronic-disease.dto';

export class UpdateChronicDiseaseDto extends PartialType(
  CreateChronicDiseaseDto,
) {}
