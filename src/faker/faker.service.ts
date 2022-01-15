import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { FakerPharmacyService } from './faker-pharmacy/faker-pharmacy.service';
import { FakerPatientService } from './faker-patient/faker-patient.service';
import { FakerMedicamentService } from './faker-medicament/faker-medicament.service';
import { FakerDoctorService } from './faker-doctor/faker-doctor.service';
import { FakerMedicalRecordService } from './faker-medical-record/faker-medical-record.service';
import { FakerMedicalCheckUpService } from './faker-medical-check-up/faker-medical-check-up.service';

@Injectable()
export class FakerService implements OnApplicationBootstrap {
  constructor(
    private readonly fakerPharmacyService: FakerPharmacyService,
    private readonly fakerPatientService: FakerPatientService,
    private readonly fakerMedicamentService: FakerMedicamentService,
    private readonly fakerDoctorService: FakerDoctorService,
    private readonly fakerMedicalRecordService: FakerMedicalRecordService,
    private readonly fakerMedicalCheckUpService: FakerMedicalCheckUpService,
  ) {}

  async onApplicationBootstrap() {
    await this.fakerPatientService.seed();
    await this.fakerPharmacyService.seed();
    await this.fakerMedicamentService.seed();
    await this.fakerDoctorService.seed();
    await this.fakerMedicalRecordService.seed();
    await this.fakerMedicalCheckUpService.seed();
  }
}
