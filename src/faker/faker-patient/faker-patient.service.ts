import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../common/EnvironmentVariables';
import { PatientService } from '../../patient/patient.service';
import { Patient } from '../../patient/entities/patient.entity';
import { RoleEnum } from '../../patient/entities/role.enum';
import { Gender } from '../../patient/entities/gender.entity';
import { CivilStatusEnum } from '../../patient/entities/civil-status.enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');

@Injectable()
export class FakerPatientService {
  constructor(
    private readonly patientService: PatientService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async seed() {
    const seedNumber: number =
      this.configService.get<number>('SEED_NUMBER') / 2;
    const currentPatients: Patient[] = await this.patientService.findAll();
    if (currentPatients.length < seedNumber) {
      await Array.from({ length: seedNumber }).map<Promise<Patient>>(
        async () => {
          // const localization = faker.address.streetName() as string;
          // const name = faker.company.companyName();
          const email = faker.internet.email() as string;
          //const password = faker.internet.password();
          const password = '123456';
          const role = RoleEnum.PATIENT;
          const firstName = faker.name.firstName();
          const lastName = faker.name.lastName();
          const birthday = faker.date.past(50);
          const cin = faker.datatype.number(10000000, 19999999);
          let gender;
          if (cin % 2 == 0) {
            gender = Gender.FEMALE;
          } else {
            gender = Gender.MALE;
          }
          const phoneNumber = faker.phone.phoneNumber('########') as string;
          const cnamId = faker.datatype.number(15, 999999);
          let civilStatus;
          if (cin % 3 == 0) {
            civilStatus = CivilStatusEnum.SINGLE;
          } else if (cin % 3 == 1) {
            civilStatus = CivilStatusEnum.MARRIED;
          } else {
            civilStatus = CivilStatusEnum.WIDOWED;
          }
          const socialStatus = 'Working';
          return await this.patientService.create({
            email,
            password,
            role,
            firstName,
            lastName,
            birthday,
            cin,
            gender,
            phoneNumber,
            cnamId,
            civilStatus,
            socialStatus,
          });
        },
      );
    }
  }
}
