import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyProductService } from './weekly-product.service';

describe('WeeklyProductService', () => {
  let service: WeeklyProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyProductService],
    }).compile();

    service = module.get<WeeklyProductService>(WeeklyProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
