import { Test, TestingModule } from '@nestjs/testing';
import { RolController } from '../rol.controller';
import { RolService } from '../rol.service';

describe('Rol Controller', () => {
  let controller: RolController;
  let service: RolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolController],
      providers: [
        {
          provide: RolService,
          useFactory() {
            return {
              get: jest.fn(),
              gelAll: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<RolController>(RolController);
    service = module.get<RolService>(RolService);
  });

  describe('getRol', () => {
    it('should retrieve rol specified by ID', () => {
      const rolID = 4;
      controller.getRol(rolID);
      expect(service.get).toHaveBeenCalled();
    });
  });

  describe('getAllRols', () => {
    it('should retrieve a list of all rols', () => {
      controller.getAllRols();
      expect(service.gelAll).toHaveBeenCalled();
    });
  });

  
});
