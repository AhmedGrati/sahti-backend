import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscriptionController } from './transcription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transcription } from './entities/transcription.entity';

@Module({
  controllers: [TranscriptionController],
  providers: [TranscriptionService],
  imports: [TypeOrmModule.forFeature([Transcription])],
})
export class TranscriptionModule {}
