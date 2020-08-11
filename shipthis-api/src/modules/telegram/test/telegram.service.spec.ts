import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from '../telegram.service';
import { telegramMockModuleMetadata  } from './mocks/telegram.mock';

describe('TelegramService', () => {
  let service: TelegramService;
  // const mockRepository: TelegramMock = new telegramMockModuleMetadata();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      telegramMockModuleMetadata,
    ).compile();

    service = module.get<TelegramService>(TelegramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
