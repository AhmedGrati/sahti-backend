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
    const { additionalInformation, medicamentsIdList, patientId } =
      createTranscriptionDto;
    const transcription = await this.transcriptionRepository.create({
      additionalInformation,
    });

    const medicaments = await this.medicamentService.findByIdList(
      medicamentsIdList,
    );
    const patient = await this.patientService.findOne(patientId);
    transcription.medicaments = medicaments;
    transcription.patient = patient;
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
    const { medicamentsIdList, additionalInformation, patientId } =
      updateTranscriptionDto;
    const transaction = await this.findOne(id);
    if (transaction) {
      const medicaments = await this.medicamentService.findByIdList(
        medicamentsIdList,
      );
      const patient = await this.patientService.findOne(patientId);
      transaction.medicaments = medicaments;
      transaction.patient = patient;
      transaction.additionalInformation = additionalInformation;
      return this.transcriptionRepository.save(transaction);
    }
    throw new NotFoundException();
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
    return this.transcriptionRepository
      .createQueryBuilder('transcription')
      .leftJoinAndSelect('transcription.patient', 'patient')
      .where('transcription.patient.id = :patientId', { patientId })
      .andWhere('transcription.status = :status', {
        status: TranscriptionStatus.NOT_CHECKED,
      })
      .printSql()
      .getMany();
  }

  async checkTranscription(id: number) {
    const transcription = await this.findOne(id);
    transcription.status = TranscriptionStatus.CHECKED;
    return this.transcriptionRepository.save(transcription);
  }
}
