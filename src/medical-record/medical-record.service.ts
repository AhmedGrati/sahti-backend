import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChronicDiseaseService } from 'src/chronic-disease/chronic-disease.service';
import { MedicalCheckUpService } from 'src/medical-check-up/medical-check-up.service';
import { PatientService } from 'src/patient/patient.service';
import { TechnicalCheckUpService } from 'src/technical-check-up/technical-check-up.service';
import { Repository } from 'typeorm';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { MedicalRecordResponse } from './dto/medical-record-response.dto';
import { MedicalRecord } from './entities/medical-record.entity';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepository: Repository<MedicalRecord>,
    private readonly patientService: PatientService,
    private readonly chronicDiseaseService: ChronicDiseaseService,
    @Inject(forwardRef(() => MedicalCheckUpService))
    private readonly medicalCheckUpService: MedicalCheckUpService,
    private readonly technicalCheckUpService: TechnicalCheckUpService,
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
    const medicalRecord = await this.medicalRecordRepository.findOne({
      where: { id },
    });
    return await this.buildMedicalRecord(medicalRecord);
  }

  async buildMedicalRecord(
    medicalRecord: MedicalRecord,
  ): Promise<MedicalRecordResponse> {
    const medicalCheckUps = await this.medicalCheckUpService.findAllByPatientId(
      medicalRecord.patient.id,
    );
    const transcriptions =
      await this.medicalCheckUpService.extractTranscriptions(medicalCheckUps);
    const technicalCheckUps =
      await this.technicalCheckUpService.findAllByPatientId(
        medicalRecord.patient.id,
      );
    const medicalRecordResponse: MedicalRecordResponse = {
      transcriptions,
      technicalCheckUps,
      medicalCheckUps,
      id: medicalRecord.id,
      bloodType: medicalRecord.bloodType,
      chronicDiseases: medicalRecord.chronicDiseases,
    };
    return medicalRecordResponse;
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

  async findMedicalRecordByPatientId(patientId: number) {
    return await this.medicalRecordRepository
      .createQueryBuilder('medicalRecord')
      .leftJoinAndSelect('medicalRecord.patient', 'patient')
      .where('medicalRecord.patient.id = :patientId', { patientId })
      .getOne();
  }
  async buildMedicalRecordByPatientId(
    patientId: number,
  ): Promise<MedicalRecordResponse> {
    const medicalRecord = await this.findMedicalRecordByPatientId(patientId);
    return this.buildMedicalRecord(medicalRecord);
  }
}
