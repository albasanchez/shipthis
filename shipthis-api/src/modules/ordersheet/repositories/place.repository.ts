import { Repository, EntityRepository } from 'typeorm';
import { Place } from '../entities/place.entity';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  async createPlace(place: Place): Promise<any> {
    return this.save(place);
  }
}
