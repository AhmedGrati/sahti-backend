import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalCheckUpService } from './technical-check-up.service';

describe('TechnicalCheckUpService', () => {
  let service: TechnicalCheckUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnicalCheckUpService],
    }).compile();

    service = module.get<TechnicalCheckUpService>(TechnicalCheckUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
