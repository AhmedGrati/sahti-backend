import { Test, TestingModule } from '@nestjs/testing';
import { PharmacistService } from './pharmacist.service';

describe('PharmacistService', () => {
  let service: PharmacistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PharmacistService],
    }).compile();

    service = module.get<PharmacistService>(PharmacistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
