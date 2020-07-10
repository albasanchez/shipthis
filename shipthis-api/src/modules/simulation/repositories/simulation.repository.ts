import { Repository, EntityRepository } from 'typeorm';
import { Simulation } from '../entities/simulation.entity';
import { NewConfigTimeDto } from '../dto/new-config-time.dto';

@EntityRepository(Simulation)
export class SimulationRepository extends Repository<Simulation> {
  getCurrentConfigTime(): Promise<Simulation> {
    return this.findOne({ ending_date: null });
  }

  async updateConfigTime(newConfigtime: NewConfigTimeDto): Promise<any> {
    const oldRegister: Simulation = await this.findOne({
      where: { ending_date: null },
    });
    oldRegister.ending_date = new Date();

    this.update(oldRegister.simulation_id, oldRegister);

    const newRegister = {
      starting_date: new Date(),
      ending_date: null,
      config_time: newConfigtime.config_time,
    };

    return this.save(newRegister);
  }
}
