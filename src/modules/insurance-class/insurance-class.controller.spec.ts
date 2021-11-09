import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceClassController } from './insurance-class.controller';
import { InsuranceClassService } from './insurance-class.service';

describe('InsuranceClassController', () => {
  let controller: InsuranceClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsuranceClassController],
      providers: [InsuranceClassService],
    }).compile();

    controller = module.get<InsuranceClassController>(InsuranceClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
