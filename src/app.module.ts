import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfigService } from './config/DatabaseConfigService';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { TechnicianModule } from './technician/technician.module';
import { PharmacistModule } from './pharmacist/pharmacist.module';
import { UserDetailsModule } from './user-details/user-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfigService),
    PatientModule,
    DoctorModule,
    TechnicianModule,
    PharmacistModule,
    UserDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
