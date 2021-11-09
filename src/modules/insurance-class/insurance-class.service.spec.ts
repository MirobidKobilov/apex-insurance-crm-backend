import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceClassService } from './insurance-class.service';

describe('InsuranceClassService', () => {
  let service: InsuranceClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuranceClassService],
    }).compile();

    service = module.get<InsuranceClassService>(InsuranceClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
