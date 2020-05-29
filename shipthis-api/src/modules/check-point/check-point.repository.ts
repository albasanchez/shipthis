import { Repository, EntityRepository } from 'typeorm';
import { CheckPoint } from './check-point.entity';

@EntityRepository(CheckPoint)
export class CheckPointRepository extends Repository<CheckPoint> {}
