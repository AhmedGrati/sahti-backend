import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChronicDiseaseService } from 'src/chronic-disease/chronic-disease.service';
import { PatientService } from 'src/patient/patient.service';
import { Repository } from 'typeorm';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { MedicalRecord } from './entities/medical-record.entity';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepository: Repository<MedicalRecord>,
    private readonly patientService: PatientService,
    private readonly chronicDiseaseService: ChronicDiseaseService,
  ) {}
  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const { patientId, bloodType } = createMedicalRecordDto;
    const patient = await this.patientService.findOne(patientId);
    const medicalRecord = await this.medicalRecordRepository.create({
      patient,
      bloodType,
    });
    return this.medicalRecordRepository.save(medicalRecord);
  }

  async findAll() {
    return this.medicalRecordRepository.find();
  }

  async findOne(id: number) {
    return this.medicalRecordRepository.findOne({ where: { id } });
  }

  // update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
  //   return `This action updates a #${id} medicalRecord`;
  // }

  async softDelete(id: number) {
    return this.medicalRecordRepository.softDelete(id);
  }

  async assignChronicDiseases(id: number, names: string[]) {
    const medicalRecord = await this.findOne(id);
    const chronicDiseases =
      await this.chronicDiseaseService.createMultipleChronicDiseases(names);
    medicalRecord.chronicDiseases = chronicDiseases;
    return await this.medicalRecordRepository.save(medicalRecord);
  }
}
