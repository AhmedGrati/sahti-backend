import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentService } from './medicament.service';

describe('MedicamentService', () => {
  let service: MedicamentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicamentService],
    }).compile();

    service = module.get<MedicamentService>(MedicamentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
