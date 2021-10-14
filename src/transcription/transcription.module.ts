import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscriptionController } from './transcription.controller';

@Module({
  controllers: [TranscriptionController],
  providers: [TranscriptionService]
})
export class TranscriptionModule {}
