import { Repository, EntityRepository } from 'typeorm';
import { CommercialAlly } from '../entities/commercial-ally.entity';
import { Warehouse } from '../entities/warehouse.entity';
import { Place } from '../../ordersheet/entities/place.entity';
import { NewCommercialAllyDto} from '../dto/new-commercial-ally.dto';
import { CommercialAllyInfoDto } from '../dto/commercial-ally-info.dto';
import { PlaceRepository } from '../../ordersheet/repositories/place.repository';
import { WarehouseRepository } from '../repositories/warehouse.repository';
import { CommercialAllyStatus } from '../constants/commercial-ally-status.enum';
import { MapperWarehouse} from '../../../mapper/mapper-warehouse';
import { UpdateCommercialAllyDto } from '../dto/update-commercial-ally.dto';

@EntityRepository(CommercialAlly)
export class CommercialAllyRepository extends Repository<CommercialAlly> {

    async createNewCommercialAlly(newCommercialAlly: NewCommercialAllyDto, warehouses: Warehouse[]) : Promise<any> {

      const commercial_ally = {
        name: newCommercialAlly.name,
        email: newCommercialAlly.email,
        phone_number: newCommercialAlly.phone_number,
        manager_name: newCommercialAlly.manager_name,
        manager_last_name: newCommercialAlly.manager_last_name,
        description: newCommercialAlly.description,
        status: CommercialAllyStatus.ACTIVE,
        warehouses: warehouses,
      };

        return this.save(commercial_ally);
      }

    async getCommercialAllyById(id: string) : Promise<any> {
      return this.findOne({
        where: { commercial_ally_id: id },
      });
    }

    async getAllCommercialAllies() : Promise<any> {
      return this.find();
    }

    async updateCommercialAlly(newCommercialAlly: UpdateCommercialAllyDto): Promise<any> {
       
      const commercial_ally = {
        name: newCommercialAlly.name,
        email: newCommercialAlly.email,
        phone_number: newCommercialAlly.phone_number,
        manager_name: newCommercialAlly.manager_name,
        manager_last_name: newCommercialAlly.manager_last_name,
        description: newCommercialAlly.description,
      }

      this.update(newCommercialAlly.commercial_ally_key, commercial_ally)

      return  { response: 'Commercial Ally has been updated sucessfully' };
   }

   async deleteCommercialAlly(commercial_ally_key: string): Promise<any> {
       
    await this.update(commercial_ally_key, {status: CommercialAllyStatus.DELETED})

    return  { response: 'Commercial Ally has been deleted sucessfully' };
 } 

}