import { ItemType } from './item-type.entity';
import { EntityRepository, Repository } from 'typeorm';
@EntityRepository(ItemType)
export class ItemTypeRepository extends Repository<ItemType> {}
