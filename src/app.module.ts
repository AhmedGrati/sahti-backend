import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfigService } from './config/DatabaseConfigService';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfigService),
    UserModule,
    PatientModule,
    DoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
