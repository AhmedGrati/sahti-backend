import { Test, TestingModule } from '@nestjs/testing';
import { ChronicDiseaseService } from './chronic-disease.service';

describe('ChronicDiseaseService', () => {
  let service: ChronicDiseaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChronicDiseaseService],
    }).compile();

    service = module.get<ChronicDiseaseService>(ChronicDiseaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
