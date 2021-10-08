import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/EnvironmentVariables';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';
import { PharmacyService } from 'src/pharmacy/pharmacy.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');
@Injectable()
export class FakerPharmacyService {
  constructor(
    private readonly pharmacyService: PharmacyService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async seed() {
    const seedNumber: number = this.configService.get<number>('SEED_NUMBER');
    const currentPharmacies: Pharmacy[] = await this.pharmacyService.findAll();
    if (currentPharmacies.length < seedNumber) {
      await Array.from({ length: seedNumber }).map<Promise<Pharmacy>>(
        async () => {
          const localization = faker.address.streetName() as string;
          const phone = faker.phone.phoneNumber('+216 ########') as string;
          const name = faker.company.companyName();
          return await this.pharmacyService.create({
            localization,
            phone,
            name,
          });
        },
      );
    }
  }
}
