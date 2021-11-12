import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { FakerPharmacyService } from './faker-pharmacy/faker-pharmacy.service';

@Injectable()
export class FakerService implements OnApplicationBootstrap {
  constructor(private readonly fakerPharmacyService: FakerPharmacyService) {}

  async onApplicationBootstrap() {
    // await this.fakerPharmacyService.seed();
  }
}
