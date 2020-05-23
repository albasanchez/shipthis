import { Repository, EntityRepository } from 'typeorm';
import { ItemPriceHist } from './item-price-hist.entity';

@EntityRepository(ItemPriceHist)
export class ItemPriceHistRepository extends Repository<ItemPriceHist> {}
