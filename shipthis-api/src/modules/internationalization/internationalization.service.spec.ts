import { Test, TestingModule } from '@nestjs/testing';
import { InternationalizationService } from './internationalization.service';

describe('InternationalizationService', () => {
  let service: InternationalizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternationalizationService],
    }).compile();

    service = module.get<InternationalizationService>(InternationalizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
