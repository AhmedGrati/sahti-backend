import { Injectable } from '@nestjs/common';
import { CreateMedicamentDto } from 'src/medicament/dto/create-medicament.dto';
import { Medicament } from 'src/medicament/entities/medicament.entity';
import { MedicamentService } from 'src/medicament/medicament.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const medicamentsData = require('../../../data/medicaments.json');
@Injectable()
export class FakerMedicamentService {
  constructor(private readonly medicamentService: MedicamentService) {}

  async seed() {
    const currentMedicaments: Medicament[] =
      await this.medicamentService.findAll();
    const medicamentsArray = medicamentsData.results;
    if (currentMedicaments.length < medicamentsArray.length) {
      medicamentsArray.forEach(async (medicament) => {
        const name: string = medicament.term;
        const createMedicamentInput: CreateMedicamentDto = { name };
        await this.medicamentService.create(createMedicamentInput);
      });
    }
  }
}
