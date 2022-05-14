import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyProductController } from './weekly-product.controller';
import { WeeklyProductService } from './weekly-product.service';

describe('WeeklyProductController', () => {
  let controller: WeeklyProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklyProductController],
      providers: [WeeklyProductService],
    }).compile();

    controller = module.get<WeeklyProductController>(WeeklyProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
