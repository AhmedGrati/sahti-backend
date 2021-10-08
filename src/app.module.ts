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
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { FakerModule } from './faker/faker.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfigService),
    PatientModule,
    DoctorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TechnicianModule,
    PharmacistModule,
    UserDetailsModule,
    PharmacyModule,
    FakerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
