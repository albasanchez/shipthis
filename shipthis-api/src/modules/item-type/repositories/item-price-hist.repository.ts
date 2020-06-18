import { Repository, EntityRepository } from 'typeorm';
import { ItemPriceHist } from '../entities/item-price-hist.entity';
import { NewItemHistDto } from '../dto/item-price-history.dto';

@EntityRepository(ItemPriceHist)
export class ItemPriceHistRepository extends Repository<ItemPriceHist> {
  getCurrentPrice(): Promise<ItemPriceHist> {
    return this.findOne({ ending_date: null });
  }

  async updateHistory(NewRegister: NewItemHistDto) : Promise<any> {

    const OldRegister: ItemPriceHist = await this.findOne({ where: { ending_date: null } });
    OldRegister.ending_date = new Date ();

    this.update(OldRegister.item_price_hist_id, OldRegister);

    const NewPriceRegister = {
      starting_date: new Date (),
      ending_date: null,
      base_price: NewRegister.base_price,
      price_km: NewRegister.price_km,
    };

    return this.save(NewPriceRegister);

  }

}
