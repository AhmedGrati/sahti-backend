import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentController } from './medicament.controller';
import { MedicamentService } from './medicament.service';

describe('MedicamentController', () => {
  let controller: MedicamentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicamentController],
      providers: [MedicamentService],
    }).compile();

    controller = module.get<MedicamentController>(MedicamentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
