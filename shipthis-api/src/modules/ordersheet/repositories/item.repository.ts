import { Repository, EntityRepository } from 'typeorm';
import { Item } from '../entities/item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {}
