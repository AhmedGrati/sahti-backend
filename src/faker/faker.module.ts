import { Module } from '@nestjs/common';
import { FakerPharmacyModule } from './faker-pharmacy/faker-pharmacy.module';
import { FakerService } from './faker.service';
import { FakerPatientModule } from './faker-patient/faker-patient.module';
import { FakerMedicamentModule } from './faker-medicament/faker-medicament.module';
import { FakerDoctorModule } from './faker-doctor/faker-doctor.module';
import { FakerMedicalCheckUpModule } from './faker-medical-check-up/faker-medical-check-up.module';
import { FakerMedicalRecordModule } from './faker-medical-record/faker-medical-record.module';

@Module({
  imports: [
    FakerPharmacyModule,
    FakerPatientModule,
    FakerMedicamentModule,
    FakerDoctorModule,
    FakerMedicalCheckUpModule,
    FakerMedicalRecordModule,
  ],
  providers: [FakerService],
})
export class FakerModule {}
