import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/filters/http-error.filter';
import { MedicalCheckUpModule } from './medical-check-up/medical-check-up.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { ChronicDiseaseModule } from './chronic-disease/chronic-disease.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { TechnicalCheckUpModule } from './technical-check-up/technical-check-up.module';
import { FileModule } from './file/file.module';

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
    MedicalCheckUpModule,
    MedicalRecordModule,
    ChronicDiseaseModule,
    RedisCacheModule,
    TechnicalCheckUpModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
