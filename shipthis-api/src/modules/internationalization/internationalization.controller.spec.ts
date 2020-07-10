import { Test, TestingModule } from '@nestjs/testing';
import { InternationalizationController } from './internationalization.controller';

describe('Internationalization Controller', () => {
  let controller: InternationalizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternationalizationController],
    }).compile();

    controller = module.get<InternationalizationController>(
      InternationalizationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
