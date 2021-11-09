import { Test, TestingModule } from '@nestjs/testing';
import { CalculationGroupController } from './calculation-group.controller';
import { CalculationGroupService } from './calculation-group.service';

describe('CalculationGroupController', () => {
  let controller: CalculationGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculationGroupController],
      providers: [CalculationGroupService],
    }).compile();

    controller = module.get<CalculationGroupController>(CalculationGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
