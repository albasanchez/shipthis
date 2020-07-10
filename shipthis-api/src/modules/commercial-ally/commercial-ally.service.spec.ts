import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAllyService } from './commercial-ally.service';

describe('CommercialAllyService', () => {
  let service: CommercialAllyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercialAllyService],
    }).compile();

    service = module.get<CommercialAllyService>(CommercialAllyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
