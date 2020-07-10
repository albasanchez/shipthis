import { OrdersDetailsDto } from '../modules/ordersheet/dto/orders-details.dto';
import { Ordersheet } from '../modules/ordersheet/entities/ordersheet.entity';

export class MapperOrder {

    static ordersheetToOrderDetails(order: Ordersheet): OrdersDetailsDto{

        const ordersInfo: OrdersDetailsDto = {
            tracking_id: order.ordersheet_id,
            user_name : order.user.person.first_name,
            user_last_name: order.user.person.last_name,
            origin_office: order.origin_office.name,
            destination_office: null,
            destination_place: null,
            status: order.status,
            date: order.creation_date,
            items: order.items.length,
            total: order.facturation_amount,
        };

        if(order.destination_office!==null) {
            ordersInfo.destination_office = order.destination_office.name;
        }
        else {
            ordersInfo.destination_place = order.destination_place.address;
        }
        return ordersInfo;

    }

}