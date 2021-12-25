import { Module } from '@nestjs/common';
import { ChronicDiseaseService } from './chronic-disease.service';
import { ChronicDiseaseController } from './chronic-disease.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChronicDisease } from './entities/chronic-disease.entity';

@Module({
  controllers: [ChronicDiseaseController],
  providers: [ChronicDiseaseService],
  imports: [TypeOrmModule.forFeature([ChronicDisease])],
  exports: [ChronicDiseaseService],
})
export class ChronicDiseaseModule {}
