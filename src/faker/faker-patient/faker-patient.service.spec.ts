import { Test, TestingModule } from '@nestjs/testing';
import { FakerPatientService } from './faker-patient.service';

describe('FakerPatientService', () => {
  let service: FakerPatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakerPatientService],
    }).compile();

    service = module.get<FakerPatientService>(FakerPatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
