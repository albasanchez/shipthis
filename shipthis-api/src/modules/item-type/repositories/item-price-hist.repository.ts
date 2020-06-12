import { Repository, EntityRepository } from 'typeorm';
import { ItemPriceHist } from '../entities/item-price-hist.entity';

@EntityRepository(ItemPriceHist)
export class ItemPriceHistRepository extends Repository<ItemPriceHist> {
  getCurrentPrice(): Promise<ItemPriceHist> {
    return this.findOne({ ending_date: null });
  }
}
