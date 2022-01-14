import { ApiProperty } from '@nestjs/swagger';
import { CreateTranscriptionDto } from 'src/transcription/dto/create-transcription.dto';

export class CreateMedicalCheckUpDto extends CreateTranscriptionDto {
  @ApiProperty()
  additionalInformation: string;
  @ApiProperty()
  doctorId: number;
  @ApiProperty()
  medicalRecordId: number;
  @ApiProperty()
  namesOfChronicDiseases: string[];
}
