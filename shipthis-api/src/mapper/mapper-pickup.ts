import { PickupsInfoDto } from '../modules/commercial-ally/dto/pickups-info.dto';
import { Pickup } from '../modules/commercial-ally/entities/pickup.entity';

export class MapperPickup {

    static pickupToPickupsInfo(pickup: Pickup): PickupsInfoDto{

        const pickupInfo: PickupsInfoDto = {

                id: pickup.pickup_id,
                rec_name: pickup.rec_name,
                rec_last_name: pickup.rec_last_name,
                rec_phone_number: pickup.rec_phone_numer,
                rec_email: pickup.rec_email,
                creation_date: pickup.creation_date,
                delivery_date: pickup.delivery_date,
                pickup_status: pickup.status,
                facturation_amount: pickup.facturation_amount,
                origin_warehouse_name: pickup.origin_warehouse.name,
                origin_warehouse_direction: pickup.origin_warehouse.place.address,
                destination_place: pickup.destination_place.address,
                items: pickup.items,
        };
        return pickupInfo;
    }

}