import { Module } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianController } from './technician.controller';

@Module({
  controllers: [TechnicianController],
  providers: [TechnicianService],
})
export class TechnicianModule {}
