import { Test, TestingModule } from '@nestjs/testing';
import { RiskCaseService } from './risk-case.service';

describe('RiskCaseService', () => {
  let service: RiskCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskCaseService],
    }).compile();

    service = module.get<RiskCaseService>(RiskCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
