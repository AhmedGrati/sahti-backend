import { Module } from '@nestjs/common';
import { DoctorModule } from 'src/doctor/doctor.module';
import { MedicalCheckUpModule } from 'src/medical-check-up/medical-check-up.module';
import { MedicalRecordModule } from 'src/medical-record/medical-record.module';
import { MedicamentModule } from 'src/medicament/medicament.module';
import { TranscriptionModule } from 'src/transcription/transcription.module';
import { FakerMedicalCheckUpService } from './faker-medical-check-up.service';

@Module({
  providers: [FakerMedicalCheckUpService],
  exports: [FakerMedicalCheckUpService],
  imports: [
    MedicalCheckUpModule,
    DoctorModule,
    TranscriptionModule,
    MedicamentModule,
    MedicalRecordModule,
  ],
})
export class FakerMedicalCheckUpModule {}
