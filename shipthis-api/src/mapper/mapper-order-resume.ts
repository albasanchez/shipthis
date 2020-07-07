import { Pickup } from './../modules/commercial-ally/entities/pickup.entity';
import { MapperPackage } from './mapper-package';
import { MapperPersonInfo } from './mapper-person-info';
import { OrderResumeDto } from './../modules/ordersheet/dto/order-resume.dto';
import { Ordersheet } from './../modules/ordersheet/entities/ordersheet.entity';
export class MapperOrderResume {
  static generateOrderResumeFromOrdersheet(order: Ordersheet): OrderResumeDto {
    const order_resume: OrderResumeDto = new OrderResumeDto();
    order_resume.ordersheet_id = order.ordersheet_id;
    order_resume.creation_date = order.creation_date;
    order_resume.delivery_date = order.delivery_date;
    order_resume.status = order.status;
    order_resume.origin_place = order.origin_office.place;
    order_resume.destination_place = order.destination_office
      ? order.destination_office.place
      : order.destination_place;
    order_resume.order_type = order.order_price_hist.order_type.name;
    order_resume.ignore_holidays = order.ignore_holidays
      ? order.ignore_holidays
      : false;
    order_resume.discount = order.discount
      ? Number(order.discount.discount.percentage)
      : 0;
    order_resume.facturation_amount = Number(order.facturation_amount);
    order_resume.discount =
      (order_resume.discount * order_resume.facturation_amount) /
      (100 - order_resume.discount);
    order_resume.discount = Number(order_resume.discount.toFixed(2));
    order_resume.subtotal = order.items.reduce((acc, item) => {
      return acc + Number(item.item_cost);
    }, 0);
    order_resume.subtotal = Number(order_resume.subtotal.toFixed(2));
    order_resume.additional_taxes =
      order_resume.facturation_amount +
      order_resume.discount -
      order_resume.subtotal;
    order_resume.additional_taxes = Number(
      order_resume.additional_taxes.toFixed(2),
    );
    order_resume.shipper = MapperPersonInfo.genratePersonInfoDtoFromUserdata(
      order.user,
    );
    order_resume.receiver = MapperPersonInfo.generatePersonInfoFromReceiver(
      order.receiver,
    );
    order_resume.packages = MapperPackage.generatePackageDtoArrayFromItemArray(
      order.items,
    );
    order_resume.trajectory = order.trajectories;

    return order_resume;
  }

  static generateOrderResumeFromPickup(pickup: Pickup): OrderResumeDto {
    const order_resume: OrderResumeDto = new OrderResumeDto();
    order_resume.ordersheet_id = pickup.pickup_id;
    order_resume.creation_date = pickup.creation_date;
    order_resume.delivery_date = pickup.delivery_date;
    order_resume.status = pickup.status;
    order_resume.origin_place = pickup.origin_warehouse.place;
    order_resume.destination_place = pickup.destination_place;
    order_resume.order_type = 'Standard';
    order_resume.ignore_holidays = false;
    order_resume.discount = 0;
    order_resume.facturation_amount = Number(pickup.facturation_amount);
    order_resume.discount = Number(order_resume.discount.toFixed(2));
    order_resume.subtotal = pickup.items.reduce((acc, item) => {
      return acc + Number(item.item_cost);
    }, 0);
    order_resume.subtotal = Number(order_resume.subtotal.toFixed(2));
    order_resume.additional_taxes = 0;
    order_resume.additional_taxes = Number(
      order_resume.additional_taxes.toFixed(2),
    );
    order_resume.shipper = MapperPersonInfo.generateShipperInfoFromPickup(
      pickup,
    );
    order_resume.receiver = MapperPersonInfo.generateReceiverInfoFromPickup(
      pickup,
    );
    order_resume.packages = MapperPackage.generatePackageDtoArrayFromItemArray(
      pickup.items,
    );
    order_resume.trajectory = pickup.trajectories;

    return order_resume;
  }
}
