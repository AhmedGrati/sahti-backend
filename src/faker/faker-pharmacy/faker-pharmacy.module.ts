import { Module } from '@nestjs/common';
import { PharmacyModule } from 'src/pharmacy/pharmacy.module';
import { FakerPharmacyService } from './faker-pharmacy.service';

@Module({
  providers: [FakerPharmacyService],
  imports: [PharmacyModule],
  exports: [FakerPharmacyService],
})
export class FakerPharmacyModule {}
