import { Test, TestingModule } from '@nestjs/testing';
import { OfficeController } from '../office.controller';
import { OfficeService } from '../office.service';

describe('Office Controller', () => {
  let controller: OfficeController;
  let service: OfficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficeController],
      providers: [
        {
          provide: OfficeService,
          useFactory() {
            return {
              getAllActiveOffices: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<OfficeController>(OfficeController);
    service = module.get<OfficeService>(OfficeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call get all offices service', () => {
    controller.getAllActiveOffices();
    expect(service.getAllActiveOffices).toBeCalled();
  });
});
