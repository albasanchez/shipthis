
import { Characteristic } from '../../../../modules/item-type/entities/characteristic.entity';

export const defaultCharacteristic = new Characteristic();

let pickup = {
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

let registeredPickup = {
  pickup_id: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
  creation_date: '2020-08-01',
  delivery_date: '2020-08-01',
  origin_warehouse: {
    name: 'Warehouse',
    place: { address: 'Berry Street' },
    commercial_ally: {
      name: 'CommercialAlly',
      email: 'commercialAlly@gmail.com',
      phone_number: '+1 (234) 567890',
    },
  },
  destination_place: { address: 'Berry Street' },
  status: 'DELIVERED',
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
  trajectories:{
    trajectory_id: 2,
    distance: 23,
    check_points: [],
  }
};

let check_points= [
  {
  check_point_id: 1,
  check_point_order: 2,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 3,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 1,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 1,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 4,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 5,
  time_mark: new Date(),
},
]
export class PickupMock {
  find(status: string, hasCheckpoints: boolean, timeMarkMustBeNull: boolean) {
    registeredPickup.status = status;
    check_points[0].time_mark = timeMarkMustBeNull? null: new Date(); 
    registeredPickup.trajectories.check_points = hasCheckpoints? check_points:[];
    return jest.fn().mockResolvedValue([registeredPickup]);
  }
}

export const pickupCreateQueryBuilder: any = {
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  execute: jest.fn().mockReturnThis(),
};
