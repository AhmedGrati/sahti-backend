import { Module } from '@nestjs/common';
import { MedicamentService } from './medicament.service';
import { MedicamentController } from './medicament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicament } from './entities/medicament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicament])],
  controllers: [MedicamentController],
  providers: [MedicamentService],
  exports: [MedicamentService],
})
export class MedicamentModule {}
