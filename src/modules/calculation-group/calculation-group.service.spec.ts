import { Test, TestingModule } from '@nestjs/testing';
import { CalculationGroupService } from './calculation-group.service';

describe('CalculationGroupService', () => {
  let service: CalculationGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculationGroupService],
    }).compile();

    service = module.get<CalculationGroupService>(CalculationGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
