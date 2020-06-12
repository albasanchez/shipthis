import { Repository, EntityRepository } from 'typeorm';
import { Simulation } from '../entities/simulation.entity';

@EntityRepository(Simulation)
export class SimulationRepository extends Repository<Simulation> {}
