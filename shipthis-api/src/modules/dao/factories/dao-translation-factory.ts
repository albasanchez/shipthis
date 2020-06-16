import { DaoPOEditor } from './../implementations/dao-poeditor';
import { DaoFactoryConstans } from './constants/dao-factory-constants.enum';
import { IDaoFactory } from './interface/IDaofactory.interface';

export class DaoTranslationFactory implements IDaoFactory {
  factoryMethod(type: string) {
    switch (type) {
      case DaoFactoryConstans.POEDITOR:
        return new DaoPOEditor();

      default:
        break;
    }
  }
}
