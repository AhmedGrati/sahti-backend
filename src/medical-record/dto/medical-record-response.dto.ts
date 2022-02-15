import { ApiProperty } from '@nestjs/swagger';
import { ChronicDisease } from 'src/chronic-disease/entities/chronic-disease.entity';
import { MedicalCheckUp } from 'src/medical-check-up/entities/medical-check-up.entity';
import { TechnicalCheckUp } from 'src/technical-check-up/entities/technical-check-up.entity';
import { Transcription } from 'src/transcription/entities/transcription.entity';
import { BloodType } from '../entities/blood-type.enum';

export class MedicalRecordResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  bloodType: BloodType;

  @ApiProperty()
  transcriptions: Transcription[];

  @ApiProperty()
  medicalCheckUps: MedicalCheckUp[];

  @ApiProperty()
  technicalCheckUps: TechnicalCheckUp[];

  @ApiProperty()
  chronicDiseases: ChronicDisease[];
}
