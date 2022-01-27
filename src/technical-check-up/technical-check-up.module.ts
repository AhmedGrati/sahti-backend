import { Module } from '@nestjs/common';
import { TechnicalCheckUpService } from './technical-check-up.service';
import { TechnicalCheckUpController } from './technical-check-up.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalCheckUp } from './entities/technical-check-up.entity';
import { FileModule } from '../file/file.module';
import { PatientModule } from '../patient/patient.module';

@Module({
  controllers: [TechnicalCheckUpController],
  providers: [TechnicalCheckUpService],
  imports: [
    TypeOrmModule.forFeature([TechnicalCheckUp]),
    FileModule,
    PatientModule,
  ],
  exports: [TechnicalCheckUpService],
})
export class TechnicalCheckUpModule {}
