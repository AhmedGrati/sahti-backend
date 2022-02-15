import { Test, TestingModule } from '@nestjs/testing';
import { MedicalCheckUpService } from './medical-check-up.service';

describe('MedicalCheckUpService', () => {
  let service: MedicalCheckUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalCheckUpService],
    }).compile();

    service = module.get<MedicalCheckUpService>(MedicalCheckUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
