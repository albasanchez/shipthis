import { HttpStatus } from '@nestjs/common';
import { Warehouse } from '../../entities/warehouse.entity';
import { Characteristic } from '../../../../modules/item-type/entities/characteristic.entity';
import { Place } from '../../../../modules/ordersheet/entities/place.entity';

export const defaultWarehouse = new Warehouse();
export const defaultPlace = new Place();
export const defaultCharacteristic = new Characteristic();

export const warehouse = {
  name: 'Warehouse',
  commercial_ally_key: 'ad1da626-b492-4c9c-ac0b-655852d9a6e8',
  address: '199-145 W Brighton Ave. Syracuse, NY . USA',
  place: defaultPlace,
};

export const ally = {
  commercial_ally_id: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
  commercial_ally_key: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
  name: 'CommercialAlly',
  email: 'ally@gmail.com',
  phone_number: '+1 (234) 567890',
  manager_name: 'manager',
  manager_last_name: 'name',
  description: 'eCommerce',
  warehouses: [defaultWarehouse],
  status: '',
};

export const pickup = {
  tracking_id: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
  commercial_ally_api_key: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
  Warehouse_id: 1,
  rec_first_name: 'John',
  rec_last_name: 'Doe',
  rec_email: 'johnDoe@gmail.com',
  rec_phone_number: '+1 (234) 567890',
  destination_address: 'Berry Street',
  items: [
    {
      description: 'Item1',
      item_weight: 100,
      item_length: 130,
      item_width: 30,
      item_height: 50,
      characteristics: [defaultCharacteristic, defaultCharacteristic],
    },
    {
      description: 'Item2',
      item_weight: 100,
      item_length: 130,
      item_width: 30,
      item_height: 50,
      characteristics: null,
    },
  ],
};

export const registeredPickup = {
  pickup_id: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
  creation_date: '2020-08-01',
  origin_warehouse: {
    place: { address: 'Berry Street' },
    commercial_ally: {
      name: 'CommercialAlly',
      email: 'commercialAlly@gmail.com',
      phone_number: '+1 (234) 567890',
    },
  },
  destination_place: { address: 'Berry Street' },
  facturation_amount: 215,
  items: [
    {
      description: 'Description',
      item_weight: 100,
      item_length: 130,
      item_width: 30,
      item_height: 50,
      item_cost: 5,
      characteristics: [{ characteristic: { name: 'Flammable' } }],
    },
  ],
  rec_name: 'John',
  rec_last_name: 'Doe',
  rec_phone_numer: '+1 (234) 567890',
  rec_email: 'johndoe@gmail.com',
};

export const response: any = {
  json: (body?: any) => {
    //
  },
  status: (code: number) => HttpStatus.OK,
};
