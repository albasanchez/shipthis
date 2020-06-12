import { Repository, EntityRepository } from 'typeorm';
import { CheckPoint } from '../entities/check-point.entity';

@EntityRepository(CheckPoint)
export class CheckPointRepository extends Repository<CheckPoint> {}
