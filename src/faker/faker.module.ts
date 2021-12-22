import { Module } from '@nestjs/common';
import { FakerPharmacyModule } from './faker-pharmacy/faker-pharmacy.module';
import { FakerService } from './faker.service';
import { FakerPatientModule } from './faker-patient/faker-patient.module';

@Module({
  imports: [FakerPharmacyModule, FakerPatientModule],
  providers: [FakerService],
})
export class FakerModule {}
