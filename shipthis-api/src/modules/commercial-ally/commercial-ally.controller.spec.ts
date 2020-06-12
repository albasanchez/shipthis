import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAllyController } from './commercial-ally.controller';

describe('CommercialAlly Controller', () => {
  let controller: CommercialAllyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialAllyController],
    }).compile();

    controller = module.get<CommercialAllyController>(CommercialAllyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
