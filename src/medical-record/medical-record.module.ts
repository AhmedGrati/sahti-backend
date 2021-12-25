import { Module } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { MedicalRecordController } from './medical-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { PatientModule } from 'src/patient/patient.module';
import { ChronicDiseaseModule } from 'src/chronic-disease/chronic-disease.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord]),
    PatientModule,
    ChronicDiseaseModule,
  ],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService],
  exports: [MedicalRecordService],
})
export class MedicalRecordModule {}
