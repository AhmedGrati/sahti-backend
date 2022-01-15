import { Test, TestingModule } from '@nestjs/testing';
import { ChronicDiseaseController } from './chronic-disease.controller';
import { ChronicDiseaseService } from './chronic-disease.service';

describe('ChronicDiseaseController', () => {
  let controller: ChronicDiseaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChronicDiseaseController],
      providers: [ChronicDiseaseService],
    }).compile();

    controller = module.get<ChronicDiseaseController>(ChronicDiseaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
