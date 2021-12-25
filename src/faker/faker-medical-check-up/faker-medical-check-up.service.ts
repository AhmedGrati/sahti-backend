import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/EnvironmentVariables';
import { DoctorService } from 'src/doctor/doctor.service';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { MedicalCheckUp } from 'src/medical-check-up/entities/medical-check-up.entity';
import { MedicalCheckUpService } from 'src/medical-check-up/medical-check-up.service';
import { MedicalRecordService } from 'src/medical-record/medical-record.service';
import { Medicament } from 'src/medicament/entities/medicament.entity';
import { MedicamentService } from 'src/medicament/medicament.service';

@Injectable()
export class FakerMedicalCheckUpService {
  constructor(
    private readonly medicalCheckUpService: MedicalCheckUpService,
    private readonly doctorService: DoctorService,
    private readonly medicalRecordService: MedicalRecordService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly medicamentService: MedicamentService,
  ) {}

  async seed() {
    setTimeout(async () => {
      const seedNumber: number = this.configService.get<number>('SEED_NUMBER');
      const currentMedicalCheckUps: MedicalCheckUp[] =
        await this.medicalCheckUpService.findAll();
      if (currentMedicalCheckUps.length < seedNumber) {
        const allMedicalRecords = await this.medicalRecordService.findAll();
        const allDoctors: Doctor[] = await this.doctorService.findAll();
        const allMedicaments: Medicament[] =
          await this.medicamentService.findAll();
        const medicamentsIdList = [
          allMedicaments[0].id,
          allMedicaments[1].id,
          allMedicaments[2].id,
        ];
        allDoctors.forEach(async (doctor, index) => {
          const medicalRecordId = allMedicalRecords[index].id;
          return await this.medicalCheckUpService.create({
            medicalRecordId,
            doctorId: doctor.id,
            remarks: 'Important Remarks',
            medicamentsIdList,
            additionalInformation: 'Additional Information',
            namesOfChronicDiseases: ['Chron'],
          });
        });
      }
    }, 6000);
  }
}
