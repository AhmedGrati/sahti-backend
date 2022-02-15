import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicamentService } from 'src/medicament/medicament.service';
import { PatientService } from 'src/patient/patient.service';
import { generateNotFoundErrorMessage } from 'src/utils/error-message-generator';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';
import { TranscriptionStatus } from './entities/transcription-status';
import { Transcription } from './entities/transcription.entity';

@Injectable()
export class TranscriptionService {
  constructor(
    @InjectRepository(Transcription)
    private readonly transcriptionRepository: Repository<Transcription>,
    private readonly medicamentService: MedicamentService,
    private readonly patientService: PatientService,
  ) {}
  async create(createTranscriptionDto: CreateTranscriptionDto) {
    const { remarks, medicamentsIdList } = createTranscriptionDto;
    const transcription = await this.transcriptionRepository.create({
      remarks,
    });

    const medicaments = await this.medicamentService.findByIdList(
      medicamentsIdList,
    );
    transcription.medicaments = medicaments;
    return this.transcriptionRepository.save(transcription);
  }

  async createForMedicalCheckUp(medicamentNameList: string[], remarks: string) {
    const transcription = await this.transcriptionRepository.create({
      remarks,
    });
    const medicaments = await this.medicamentService.findByNameList(
      medicamentNameList,
    );
    transcription.medicaments = medicaments;
    return this.transcriptionRepository.save(transcription);
  }

  async findAll(): Promise<Transcription[]> {
    return this.transcriptionRepository.find();
  }

  async findOne(id: number): Promise<Transcription> {
    const transcription = await this.transcriptionRepository.findOne({
      where: { id },
    });
    if (transcription) {
      return transcription;
    }
    throw new NotFoundException(
      generateNotFoundErrorMessage(Transcription.name),
    );
  }

  async update(id: number, updateTranscriptionDto: UpdateTranscriptionDto) {
    const { medicamentsIdList, remarks } = updateTranscriptionDto;
    const transaction = await this.findOne(id);
    if (transaction) {
      const medicaments = await this.medicamentService.findByIdList(
        medicamentsIdList,
      );
      transaction.medicaments = medicaments;
      transaction.remarks = remarks;
      return this.transcriptionRepository.save(transaction);
    }
  }

  async softDelete(id: number): Promise<UpdateResult> {
    return await this.transcriptionRepository.softDelete(id);
  }

  async restore(id: number): Promise<UpdateResult> {
    return await this.transcriptionRepository.restore(id);
  }
  async findListOfNonValidatedTranscriptions(
    patientId: number,
  ): Promise<Transcription[]> {
    const result = [];
    const transcriptions = await this.transcriptionRepository
      .createQueryBuilder('transcription')
      .leftJoinAndSelect('transcription.medicalCheckUp', 'medicalCheckUp')
      .innerJoinAndSelect('medicalCheckUp.medicalRecord', 'medicalRecord')
      .innerJoinAndSelect('medicalRecord.patient', 'patient')
      .where('patient.id = :patientId', { patientId })
      .andWhere('transcription.status = :status', {
        status: TranscriptionStatus.NOT_CHECKED,
      })
      .getMany();
    for (let i = 0; i < transcriptions.length; i++) {
      const transcription = await this.findOne(transcriptions[i].id);
      result.push(transcription);
    }
    return result;
  }

  async checkTranscription(id: number) {
    const transcription = await this.findOne(id);
    transcription.status = TranscriptionStatus.CHECKED;
    return this.transcriptionRepository.save(transcription);
  }

  async findAllByPatientId(patientId: number) {
    const result = [];
    const transcriptions = await this.transcriptionRepository
      .createQueryBuilder('transcription')
      .leftJoinAndSelect('transcription.medicalCheckUp', 'medicalCheckUp')
      .innerJoinAndSelect('medicalCheckUp.medicalRecord', 'medicalRecord')
      .innerJoinAndSelect('medicalRecord.patient', 'patient')
      .where('patient.id = :patientId', {
        patientId,
      })
      .getMany();
    for (let i = 0; i < transcriptions.length; i++) {
      const transcription = await this.findOne(transcriptions[i].id);
      result.push(transcription);
    }
    return result;
  }
}
