import { Test, TestingModule } from '@nestjs/testing';
import { RiskExclusionController } from './risk-exclusion.controller';
import { RiskExclusionService } from './risk-exclusion.service';

describe('RiskExclusionController', () => {
  let controller: RiskExclusionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskExclusionController],
      providers: [RiskExclusionService],
    }).compile();

    controller = module.get<RiskExclusionController>(RiskExclusionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
