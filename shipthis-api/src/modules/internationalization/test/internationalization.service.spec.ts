import { Test, TestingModule } from '@nestjs/testing';
import { InternationalizationService } from '../internationalization.service';
import { internationalizationMockModuleMetadata } from './mocks/internationalization.mock';
import axios from 'axios';
import { TraductionMock } from './mocks/traduction.mock';
import { POEditorConnectionException } from '../../../common/exceptions';

describe('InternationalizationService', () => {
  let service: InternationalizationService;
  const traductionMock: TraductionMock = new TraductionMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      internationalizationMockModuleMetadata,
    ).compile();

    service = module.get<InternationalizationService>(
      InternationalizationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get dictionary', () => {
    axios.post = traductionMock.post(true);
    axios.get = traductionMock.get(true);
    service.getDictionary('EN');
    expect(axios.post).toHaveBeenCalled();
  });

  describe('dictionary exceptions', () => {
    it('post should throw poeditor connection exception', async () => {
      axios.post = traductionMock.post(false);
      try {
        await service.getDictionary('EN');
      } catch (e) {
        expect(axios.post).toHaveBeenCalled();
        expect(e).toBeInstanceOf(POEditorConnectionException);
      }
    });
    it('get should throw poeditor connection exception', async () => {
      axios.post = traductionMock.post(true);
      axios.get = traductionMock.get(false);
      try {
        await service.getDictionary('EN');
      } catch (e) {
        expect(axios.post).toHaveBeenCalled();
        expect(e).toBeInstanceOf(POEditorConnectionException);
      }
    });
  });
});
