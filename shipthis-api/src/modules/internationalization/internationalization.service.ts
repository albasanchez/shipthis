import { IDaoTranslation } from './../dao/interfaces/dao-translation.interface';
import { DaoTranslationFactory } from './../dao/factories/dao-translation-factory';
import { IDaoFactory } from './../dao/factories/interface/IDaofactory.interface';
import { Injectable } from '@nestjs/common';
import { DaoFactoryConstans } from '../dao/factories/constants/dao-factory-constants.enum';
import { AppLoggerService } from 'src/log/applogger.service';

@Injectable()
export class InternationalizationService {
  constructor(private readonly _appLogger: AppLoggerService) {}

  getDictionary(lang: string): Promise<any> {
    this._appLogger.log('Handling New Request: Internationalizacion Service');
    const dict_fetcher_constructor: IDaoFactory = new DaoTranslationFactory();
    const dict_fetcher: IDaoTranslation = dict_fetcher_constructor.factoryMethod(
      DaoFactoryConstans.POEDITOR,
    );
    return dict_fetcher.fetchDictionary(lang);
  }
}
