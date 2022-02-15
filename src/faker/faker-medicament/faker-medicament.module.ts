import { Module } from '@nestjs/common';
import { MedicamentModule } from 'src/medicament/medicament.module';
import { FakerMedicamentService } from './faker-medicament.service';

@Module({
  providers: [FakerMedicamentService],
  imports: [MedicamentModule],
  exports: [FakerMedicamentService],
})
export class FakerMedicamentModule {}
