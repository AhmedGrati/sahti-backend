import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/EnvironmentVariables';
import { CreateMedicalRecordDto } from 'src/medical-record/dto/create-medical-record.dto';
import { BloodType } from 'src/medical-record/entities/blood-type.enum';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { MedicalRecordService } from 'src/medical-record/medical-record.service';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class FakerMedicalRecordService {
  constructor(
    private readonly medicalRecordService: MedicalRecordService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly patientService: PatientService,
  ) {}

  async seed() {
    setTimeout(async () => {
      const seedNumber: number = this.configService.get<number>('SEED_NUMBER');
      const currentMedicalRecords: MedicalRecord[] =
        await this.medicalRecordService.findAll();
      const allPatients = await this.patientService.findAll();
      if (currentMedicalRecords.length < seedNumber) {
        const allBloodTypes = [
          BloodType.A,
          BloodType.AB,
          BloodType.B,
          BloodType.O,
        ];
        allPatients.forEach(async (patient) => {
          const bloodType =
            allBloodTypes[Math.floor(Math.random() * allBloodTypes.length)];
          const createMedicalRecordDto: CreateMedicalRecordDto = {
            bloodType,
            patientId: patient.id,
          };
          return await this.medicalRecordService.create(createMedicalRecordDto);
        });
      }
    }, 3000);
  }
}
