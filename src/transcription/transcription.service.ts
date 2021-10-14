import { Injectable } from '@nestjs/common';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';

@Injectable()
export class TranscriptionService {
  create(createTranscriptionDto: CreateTranscriptionDto) {
    return 'This action adds a new transcription';
  }

  findAll() {
    return `This action returns all transcription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transcription`;
  }

  update(id: number, updateTranscriptionDto: UpdateTranscriptionDto) {
    return `This action updates a #${id} transcription`;
  }

  remove(id: number) {
    return `This action removes a #${id} transcription`;
  }
}
