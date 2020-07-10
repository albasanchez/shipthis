import { DaoFactoryConstans } from './constants/dao-factory-constants.enum';
import { IDaoFactory } from './interface/IDaofactory.interface';
import { DaoLocationIq } from '../implementations/dao-locationiq';

export class DaoLocationFactory implements IDaoFactory {
  factoryMethod(type: string) {
    switch (type) {
      case DaoFactoryConstans.LOCATIONIQ:
        return new DaoLocationIq();

      default:
        break;
    }
  }
}
