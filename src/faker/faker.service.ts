import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { FakerPharmacyService } from './faker-pharmacy/faker-pharmacy.service';
import { FakerPatientService } from './faker-patient/faker-patient.service';
import { FakerMedicamentService } from './faker-medicament/faker-medicament.service';

@Injectable()
export class FakerService implements OnApplicationBootstrap {
  constructor(
    private readonly fakerPharmacyService: FakerPharmacyService,
    private readonly fakerPatientService: FakerPatientService,
    private readonly fakerMedicamentService: FakerMedicamentService,
  ) {}

  async onApplicationBootstrap() {
    await this.fakerPharmacyService.seed();
    await this.fakerMedicamentService.seed();
    await this.fakerPatientService.seed();
  }
}
