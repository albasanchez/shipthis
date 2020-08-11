import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { ItemTypeService } from '../../item-type.service';
import { CharPriceHistRepository } from '../../repositories/char-price-hist.repository';
import { ItemPriceHistRepository } from '../../repositories/item-price-hist.repository';
import { CharacteristicRepository } from '../../repositories/characteristic.repository';

export const ItemTypeMockModuleMetadata: ModuleMetadata = {
  providers: [
    ItemTypeService,
    CharPriceHistRepository,
    ItemPriceHistRepository,
    CharacteristicRepository,
  ],
  imports: [AppLoggerModule],
};
