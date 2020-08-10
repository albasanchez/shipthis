import { Test, TestingModule } from '@nestjs/testing';
import { OfficeService } from '../office.service';
import { officeMockModuleMetadata, OfficeMock } from './mocks/office.mock';
import { OfficeReposiroty } from '../repositories/office.repository';

describe('OfficeService', () => {
  let service: OfficeService;
  let repository: OfficeReposiroty;
  const mockOfficeRepository: OfficeMock = new OfficeMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      officeMockModuleMetadata,
    ).compile();

    service = module.get<OfficeService>(OfficeService);
    repository = module.get<OfficeReposiroty>(OfficeReposiroty);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get offices', () => {
    repository.find = mockOfficeRepository.find();
    service.getAllActiveOffices();
    expect(repository.find).toHaveBeenCalled();
  });
});
