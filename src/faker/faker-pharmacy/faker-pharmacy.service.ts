import { Injectable } from '@nestjs/common';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';
import { PharmacyService } from 'src/pharmacy/pharmacy.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pharmaciesData = require('../../../data/pharmacies.json');
@Injectable()
export class FakerPharmacyService {
  constructor(private readonly pharmacyService: PharmacyService) {}

  async seed() {
    const currentPharmacies: Pharmacy[] = await this.pharmacyService.findAll();
    if (currentPharmacies.length < pharmaciesData.length) {
      pharmaciesData.forEach(async (pharmacy) => {
        const name: string = pharmacy.pharmacy_name;
        const localization = faker.address.streetName() as string;
        const phone = faker.phone.phoneNumber('+216 ########') as string;
        return await this.pharmacyService.create({
          localization,
          phone,
          name,
        });
      });
    }
  }
}
