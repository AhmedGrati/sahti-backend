import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfigService } from './config/DatabaseConfigService';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { TechnicianModule } from './technician/technician.module';
import { PharmacistModule } from './pharmacist/pharmacist.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { FakerModule } from './faker/faker.module';
import { ConfigModule } from '@nestjs/config';
import { MedicamentModule } from './medicament/medicament.module';
import { TranscriptionModule } from './transcription/transcription.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfigService),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PatientModule,
    DoctorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TechnicianModule,
    PharmacistModule,
    PharmacyModule,
    FakerModule,
    MedicamentModule,
    TranscriptionModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
