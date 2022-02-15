import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscriptionController } from './transcription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transcription } from './entities/transcription.entity';
import { MedicamentModule } from 'src/medicament/medicament.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  controllers: [TranscriptionController],
  providers: [TranscriptionService],
  imports: [
    TypeOrmModule.forFeature([Transcription]),
    MedicamentModule,
    PatientModule,
  ],
  exports: [TranscriptionService],
})
export class TranscriptionModule {}
