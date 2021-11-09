import { Test, TestingModule } from '@nestjs/testing';
import { RiskTypeController } from './risk-type.controller';
import { RiskTypeService } from './risk-type.service';

describe('RiskTypeController', () => {
  let controller: RiskTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskTypeController],
      providers: [RiskTypeService],
    }).compile();

    controller = module.get<RiskTypeController>(RiskTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
