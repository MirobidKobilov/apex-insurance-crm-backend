import { Test, TestingModule } from '@nestjs/testing';
import { RiskCaseController } from './risk-case.controller';
import { RiskCaseService } from './risk-case.service';

describe('RiskCaseController', () => {
  let controller: RiskCaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskCaseController],
      providers: [RiskCaseService],
    }).compile();

    controller = module.get<RiskCaseController>(RiskCaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
