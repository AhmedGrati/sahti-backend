import { Test, TestingModule } from '@nestjs/testing';
import { TechnicianController } from './technician.controller';
import { TechnicianService } from './technician.service';

describe('TechnicianController', () => {
  let controller: TechnicianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnicianController],
      providers: [TechnicianService],
    }).compile();

    controller = module.get<TechnicianController>(TechnicianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
