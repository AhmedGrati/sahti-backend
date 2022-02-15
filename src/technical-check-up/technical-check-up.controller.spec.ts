import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalCheckUpController } from './technical-check-up.controller';
import { TechnicalCheckUpService } from './technical-check-up.service';

describe('TechnicalCheckUpController', () => {
  let controller: TechnicalCheckUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnicalCheckUpController],
      providers: [TechnicalCheckUpService],
    }).compile();

    controller = module.get<TechnicalCheckUpController>(
      TechnicalCheckUpController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
