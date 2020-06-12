import { Repository, EntityRepository } from 'typeorm';
import { Trajectory } from '../entities/trajectory.entity';

@EntityRepository(Trajectory)
export class TrajectoryRepository extends Repository<Trajectory> {}
