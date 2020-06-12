import { Repository, EntityRepository } from 'typeorm';
import { CharPriceHist } from '../entities/char-price-hist.entity';

@EntityRepository(CharPriceHist)
export class CharPriceHistRepository extends Repository<CharPriceHist> {}