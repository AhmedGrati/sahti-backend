import { Module } from '@nestjs/common';
import { MedicalCheckUpService } from './medical-check-up.service';
import { MedicalCheckUpController } from './medical-check-up.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalCheckUp } from './entities/medical-check-up.entity';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalCheckUp]), DoctorModule],
  controllers: [MedicalCheckUpController],
  providers: [MedicalCheckUpService],
})
export class MedicalCheckUpModule {}
