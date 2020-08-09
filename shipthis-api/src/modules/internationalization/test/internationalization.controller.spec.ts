import { Test, TestingModule } from '@nestjs/testing';
import { InternationalizationController } from '../internationalization.controller';
import { InternationalizationService } from '../internationalization.service';

describe('Internationalization Controller', () => {
  let controller: InternationalizationController;
  let service: InternationalizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternationalizationController],
      providers: [
        {
          provide: InternationalizationService,
          useFactory() {
            return {
              getDictionary: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<InternationalizationController>(
      InternationalizationController,
    );
    service = module.get<InternationalizationService>(
      InternationalizationService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call get dictionary service', () => {
    controller.getDictionary({ language: 'EN' });
    expect(service.getDictionary).toHaveBeenCalledWith('EN');
  });
});
