import { Module } from '@nestjs/common';
import { MedicalRecordModule } from 'src/medical-record/medical-record.module';
import { PatientModule } from 'src/patient/patient.module';
import { FakerMedicalRecordService } from './faker-medical-record.service';

@Module({
  providers: [FakerMedicalRecordService],
  exports: [FakerMedicalRecordService],
  imports: [MedicalRecordModule, PatientModule],
})
export class FakerMedicalRecordModule {}
