import { Repository, EntityRepository } from 'typeorm';
import { Simulation } from '../entities/simulation.entity';
import { NewRegisterDto } from '../dto/NewRegister.dto';


@EntityRepository(Simulation)
export class SimulationRepository extends Repository<Simulation> {

    getCurrentConfigTime(): Promise<Simulation> {
        return this.findOne({ ending_date: null });
      }

    async updateConfigTime(NewRegister: NewRegisterDto) : Promise<any> {

        const OldRegister: Simulation = await this.findOne({ where: { ending_date: null } });
        OldRegister.ending_date = new Date ();
    
        this.update(OldRegister.simulation_id, OldRegister);
    
        return this.save(NewRegister);
    
      }

}
