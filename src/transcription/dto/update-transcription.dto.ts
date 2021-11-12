import { PartialType } from '@nestjs/mapped-types';
import { CreateTranscriptionDto } from './create-transcription.dto';

export class UpdateTranscriptionDto extends PartialType(
  CreateTranscriptionDto,
) {}
