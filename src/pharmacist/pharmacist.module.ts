import { Module } from '@nestjs/common';
import { PharmacistService } from './pharmacist.service';
import { PharmacistController } from './pharmacist.controller';

@Module({
  controllers: [PharmacistController],
  providers: [PharmacistService],
})
export class PharmacistModule {}
