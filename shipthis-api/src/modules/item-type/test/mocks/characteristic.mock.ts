import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { ItemTypeService } from '../../item-type.service';
import { CharacteristicRepository } from '../../repositories/characteristic.repository';

export class CharMock {
  findOne(successful: boolean) {
    if (successful) {
      return jest.fn().mockResolvedValue({
        characteristic_id:1,
        name: 'Flammable',
        status: 'ACTIVE',
      });
    } else {
      return jest.fn().mockResolvedValue(null);
    }
  }
}

export const createQueryBuilder: any = {
  innerJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getMany: jest.fn().mockReturnValue([
    {
      characteristic_id: 1,
      name: 'Flammable',
      status: 'ACTIVE',
    },
  ]),
};
