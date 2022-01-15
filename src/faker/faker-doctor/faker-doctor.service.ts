import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/EnvironmentVariables';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { CivilStatusEnum } from 'src/patient/entities/civil-status.enum';
import { Gender } from 'src/patient/entities/gender.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { RoleEnum } from 'src/patient/entities/role.enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');
@Injectable()
export class FakerDoctorService {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async seed() {
    const grades = ['aggreges', 'specialist', 'resident', 'extern', 'intern'];
    const specialties = [
      'Internal medicine',
      'Cardiology',
      'Endocrinology',
      'Gastroenterology',
      'Pulmonology',
      'Respiratory medicine',
      'Oncology',
      'Gynaecologic oncology',
      'Immunology',
      'Rheumatology',
      'Neurology',
      'Oto-rhino-laringology',
      'Radiology',
      'Infectious diseases',
      'Microbiology-bacteriology',
      'Haematology',
      'Dermatology',
      'Pathology',
      'Occupational medicine',
      'Exclusion',
      'Surgery',
      'Gynecology and obstetrics',
      'Paediatrics',
      'Psychiatry',
      'General practice ',
    ];
    const seedNumber: number =
      this.configService.get<number>('SEED_NUMBER') / 2;
    const currentDoctors: Doctor[] = await this.doctorService.findAll();
    if (currentDoctors.length < seedNumber) {
      await Array.from({ length: seedNumber }).map<Promise<Patient>>(
        async () => {
          // const localization = faker.address.streetName() as string;
          // const name = faker.company.companyName();
          const email = faker.internet.email() as string;
          //const password = faker.internet.password();
          const password = '123456';
          const role = RoleEnum.DOCTOR;
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
          const officeLocalisation = faker.address.streetName() as string;
          const serviceHospital = faker.address.streetName() as string;
          const speciality =
            specialties[Math.floor(Math.random() * specialties.length)];
          const grade = grades[Math.floor(Math.random() * grades.length)];
          const doctorNumber = faker.phone.phoneNumber('######') as number;
          const socialStatus = 'Working';
          return await this.doctorService.create({
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
            speciality,
            grade,
            serviceHospital,
            officeLocalisation,
            doctorNumber,
          });
        },
      );
    }
  }
}
