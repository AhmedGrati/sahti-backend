import { CreateTranscriptionDto } from 'src/transcription/dto/create-transcription.dto';

export class CreateMedicalCheckUpDto extends CreateTranscriptionDto {
  additionalInformation: string;
  doctorId: number;
  patientId: number;
}
