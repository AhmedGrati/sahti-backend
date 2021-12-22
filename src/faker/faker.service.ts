import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { FakerPharmacyService } from './faker-pharmacy/faker-pharmacy.service';
import { FakerPatientService } from './faker-patient/faker-patient.service';

@Injectable()
export class FakerService implements OnApplicationBootstrap {
  constructor(
    private readonly fakerPharmacyService: FakerPharmacyService,
    private readonly fakerPatientService: FakerPatientService,
  ) {}

  async onApplicationBootstrap() {
    // await this.fakerPharmacyService.seed();
    await this.fakerPatientService.seed();
  }
}
