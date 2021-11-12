import { Test, TestingModule } from '@nestjs/testing';
import { TechnicianService } from './technician.service';

describe('TechnicianService', () => {
  let service: TechnicianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnicianService],
    }).compile();

    service = module.get<TechnicianService>(TechnicianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
