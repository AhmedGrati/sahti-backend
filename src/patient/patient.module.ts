import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { UserDetailsModule } from '../user-details/user-details.module';
import { UserDetailsService } from '../user-details/user-details.service';
import { UserDetail } from '../user-details/entities/user-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    UserDetailsModule,
    TypeOrmModule.forFeature([UserDetail]),
  ],
  controllers: [PatientController],
  providers: [PatientService, UserDetailsService],
  exports: [PatientService],
})
export class PatientModule {}
