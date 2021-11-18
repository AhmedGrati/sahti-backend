import { Test, TestingModule } from '@nestjs/testing';
import { MedicalCheckUpController } from './medical-check-up.controller';
import { MedicalCheckUpService } from './medical-check-up.service';

describe('MedicalCheckUpController', () => {
  let controller: MedicalCheckUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalCheckUpController],
      providers: [MedicalCheckUpService],
    }).compile();

    controller = module.get<MedicalCheckUpController>(MedicalCheckUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
