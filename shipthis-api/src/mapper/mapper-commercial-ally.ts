import { WarehouseInfoDto } from '../modules/commercial-ally/dto/warehouse-info.dto';
import { CommercialAlly} from '../modules/commercial-ally/entities/commercial-ally.entity';
import { CommercialAllyInfoDto } from '../modules/commercial-ally/dto/commercial-ally-info.dto';

export class MapperCommercialAlly {

    static commercialAllyToCommercialAllyInfo(ally: CommercialAlly): CommercialAllyInfoDto{

        const commercialAllyInfo: CommercialAllyInfoDto = {
              commercial_ally_key: ally.commercial_ally_id,
              name : ally.name,
              email: ally.email,
              phone_number: ally.phone_number,
              manager_name: ally.manager_name,
              manager_last_name: ally.manager_last_name,
              description: ally.description,
              status: ally.status
          };

        return commercialAllyInfo;
    }
}