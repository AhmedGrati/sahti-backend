import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/EnvironmentVariables';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { MedicalCheckUp } from 'src/medical-check-up/entities/medical-check-up.entity';
import { MedicalCheckUpService } from 'src/medical-check-up/medical-check-up.service';
import { Medicament } from 'src/medicament/entities/medicament.entity';
import { MedicamentService } from 'src/medicament/medicament.service';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class FakerMedicalCheckUpService {
  constructor(
    private readonly medicalCheckUpService: MedicalCheckUpService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly medicamentService: MedicamentService,
  ) {}

  async seed() {
    setTimeout(async () => {
      const seedNumber: number = this.configService.get<number>('SEED_NUMBER');
      const currentMedicalCheckUps: MedicalCheckUp[] =
        await this.medicalCheckUpService.findAll();
      if (currentMedicalCheckUps.length < seedNumber) {
        const allPatients = await this.patientService.findAll();
        const allDoctors: Doctor[] = await this.doctorService.findAll();
        const allMedicaments: Medicament[] =
          await this.medicamentService.findAll();
        const medicamentNameList = [
          allMedicaments[0].name,
          allMedicaments[1].name,
          allMedicaments[2].name,
        ];
        allDoctors.forEach(async (doctor, index) => {
          const patientId = allPatients[index].id;
          return await this.medicalCheckUpService.create({
            patientId,
            doctorId: doctor.id,
            remarks: 'Important Remarks',
            medicamentNameList,
            additionalInformation: 'Additional Information',
            namesOfChronicDiseases: ['Chron'],
            controlDate: new Date(),
          });
        });
      }
    }, 6000);
  }
}
