import { Test, TestingModule } from '@nestjs/testing';
import { RiskExclusionService } from './risk-exclusion.service';

describe('RiskExclusionService', () => {
  let service: RiskExclusionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskExclusionService],
    }).compile();

    service = module.get<RiskExclusionService>(RiskExclusionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
