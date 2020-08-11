import { Test, TestingModule } from '@nestjs/testing';
import { TelegramController } from '../telegram.controller';
import { TelegramService } from '../telegram.service';

describe('Telegram Controller', () => {
  let controller: TelegramController;
  let service: TelegramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramController],
      providers: [
        {
          provide: TelegramService,
          useFactory() {
            return {
              getBot: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<TelegramController>(TelegramController);
    service = module.get<TelegramService>(TelegramService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
