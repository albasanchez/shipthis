import { Repository, EntityRepository } from 'typeorm';
import { ItemPriceHist } from '../entities/item-price-hist.entity';
import { NewItemHistDto } from '../dto/item-price-history.dto';

@EntityRepository(ItemPriceHist)
export class ItemPriceHistRepository extends Repository<ItemPriceHist> {
  getCurrentPrice(): Promise<ItemPriceHist> {
    return this.findOne({ ending_date: null });
  }

  async updateHistory(newRegister: NewItemHistDto): Promise<any> {
    const oldRegister: ItemPriceHist = await this.findOne({
      where: { ending_date: null },
    });
    oldRegister.ending_date = new Date();

    this.update(oldRegister.item_price_hist_id, oldRegister);

    const newPriceRegister = {
      starting_date: new Date(),
      ending_date: null,
      base_price: newRegister.base_price,
      price_km: newRegister.price_km,
    };

    return this.save(newPriceRegister);
  }
}
