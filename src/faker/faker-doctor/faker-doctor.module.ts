import { Module } from '@nestjs/common';
import { DoctorModule } from 'src/doctor/doctor.module';
import { FakerDoctorService } from './faker-doctor.service';

@Module({
  providers: [FakerDoctorService],
  imports: [DoctorModule],
  exports: [FakerDoctorService],
})
export class FakerDoctorModule {}
