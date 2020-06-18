import { Repository, EntityRepository } from 'typeorm';
import { Simulation } from '../entities/simulation.entity';
import { NewConfigTimeDto } from '../dto/new-config-time.dto';


@EntityRepository(Simulation)
export class SimulationRepository extends Repository<Simulation> {

    getCurrentConfigTime(): Promise<Simulation> {
        return this.findOne({ ending_date: null });
      }

    async updateConfigTime(NewConfigtime: NewConfigTimeDto) : Promise<any> {

        const OldRegister: Simulation = await this.findOne({ where: { ending_date: null } });
        OldRegister.ending_date = new Date ();
    
        this.update(OldRegister.simulation_id, OldRegister);

        const NewRegister = {
          starting_date: new Date (),
          ending_date: null,
          config_time: NewConfigtime.config_time
        };
    
        return this.save(NewRegister);
    
      }

}
