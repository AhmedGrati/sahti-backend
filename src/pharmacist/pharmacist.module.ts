import { Module } from '@nestjs/common';
import { PharmacistService } from './pharmacist.service';
import { PharmacistController } from './pharmacist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pharmacist } from './entities/pharmacist.entity';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pharmacist]), PatientModule],
  controllers: [PharmacistController],
  providers: [PharmacistService],
  exports: [PharmacistService],
})
export class PharmacistModule {}
