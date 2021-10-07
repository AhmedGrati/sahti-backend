import { Test, TestingModule } from '@nestjs/testing';
import { UserDetailsController } from './user-details.controller';
import { UserDetailsService } from './user-details.service';

describe('UserDetailsController', () => {
  let controller: UserDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDetailsController],
      providers: [UserDetailsService],
    }).compile();

    controller = module.get<UserDetailsController>(UserDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
