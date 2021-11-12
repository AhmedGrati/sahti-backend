import { Module } from '@nestjs/common';
import { FakerPharmacyModule } from './faker-pharmacy/faker-pharmacy.module';
import { FakerService } from './faker.service';

@Module({
  imports: [FakerPharmacyModule],
  providers: [FakerService],
})
export class FakerModule {}
