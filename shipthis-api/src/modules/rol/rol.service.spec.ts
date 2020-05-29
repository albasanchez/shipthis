import { Test, TestingModule } from '@nestjs/testing';
import { RolService } from './rol.service';

describe('RolService', () => {
  let service: RolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolService],
    }).compile();

    service = module.get<RolService>(RolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
