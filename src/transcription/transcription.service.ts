import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicamentService } from 'src/medicament/medicament.service';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';
import { Transcription } from './entities/transcription.entity';

@Injectable()
export class TranscriptionService {
  constructor(
    @InjectRepository(Transcription)
    private readonly transcriptionRepository: Repository<Transcription>,
    private readonly medicamentService: MedicamentService,
  ) {}
  async create(createTranscriptionDto: CreateTranscriptionDto) {
    const { additionalInformation, medicamentsIdList } = createTranscriptionDto;
    const transcription = await this.transcriptionRepository.create({
      additionalInformation,
    });

    const medicaments = await this.medicamentService.findByIdList(
      medicamentsIdList,
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
    throw new NotFoundException();
  }

  async update(id: number, updateTranscriptionDto: UpdateTranscriptionDto) {
    const { medicamentsIdList, additionalInformation } = updateTranscriptionDto;
    const transaction = await this.findOne(id);
    if (transaction) {
      const medicaments = await this.medicamentService.findByIdList(
        medicamentsIdList,
      );
      transaction.medicaments = medicaments;
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
}
