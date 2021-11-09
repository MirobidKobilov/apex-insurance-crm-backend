import { Test, TestingModule } from '@nestjs/testing';
import { RiskTypeService } from './risk-type.service';

describe('RiskTypeService', () => {
  let service: RiskTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskTypeService],
    }).compile();

    service = module.get<RiskTypeService>(RiskTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
