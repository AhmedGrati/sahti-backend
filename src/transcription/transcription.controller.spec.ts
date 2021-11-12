import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptionController } from './transcription.controller';
import { TranscriptionService } from './transcription.service';

describe('TranscriptionController', () => {
  let controller: TranscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranscriptionController],
      providers: [TranscriptionService],
    }).compile();

    controller = module.get<TranscriptionController>(TranscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
