import { Module } from '@nestjs/common';
import { FakerPatientService } from './faker-patient.service';
import { PatientModule } from '../../patient/patient.module';

@Module({
  providers: [FakerPatientService],
  imports: [PatientModule],
  exports: [FakerPatientService],
})
export class FakerPatientModule {}
