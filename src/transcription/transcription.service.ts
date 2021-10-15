import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';
import { Transcription } from './entities/transcription.entity';

@Injectable()
export class TranscriptionService {
  constructor(
    @InjectRepository(Transcription)
    private readonly transcriptionRepository: Repository<Transcription>,
  ) {}
  create(createTranscriptionDto: CreateTranscriptionDto) {
    return 'This action adds a new transcription';
  }

  async findAll(): Promise<Transcription[]> {
    return this.transcriptionRepository.find();
  }

  async findOne(id: number): Promise<Transcription> {
    return this.transcriptionRepository.findOne({ where: { id } });
  }

  update(id: number, updateTranscriptionDto: UpdateTranscriptionDto) {
    return `This action updates a #${id} transcription`;
  }

  async softDelete(id: number): Promise<UpdateResult> {
    return await this.transcriptionRepository.softDelete(id);
  }

  async restore(id: number): Promise<UpdateResult> {
    return await this.transcriptionRepository.restore(id);
  }
}
