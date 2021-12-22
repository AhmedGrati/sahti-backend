import { Module } from '@nestjs/common';
import { FakerPharmacyModule } from './faker-pharmacy/faker-pharmacy.module';
import { FakerService } from './faker.service';
import { FakerPatientModule } from './faker-patient/faker-patient.module';
import { FakerMedicamentModule } from './faker-medicament/faker-medicament.module';

@Module({
  imports: [FakerPharmacyModule, FakerPatientModule, FakerMedicamentModule],
  providers: [FakerService],
})
export class FakerModule {}
