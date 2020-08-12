import { Characteristic } from '../../../item-type/entities/characteristic.entity';
import { Place } from '../../entities/place.entity';

export const defaultPlace = new Place();
export const defaultCharacteristic = new Characteristic();
export const response: any = {};
export const address: any = { address: 'Berry Street' };

export const order = {
  tracking_id: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
  ignore_holidays: false,
  order_price_hist: 1,
  useremail: 'email@gmail.com',
  receiver_id: 1,
  discount_id: 1,
  origin_office: 1,
  destination_office: null,
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

export const registeredOrder = {
  ordersheet_id: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
  creation_date: '2020-08-01',
  delivery_date: '2020-08-01',
  user: {
    person: {
      first_name: 'Luisa',
      middle_name: 'Maria',
      last_name: 'Contreras',
      second_last_name: 'Lara',
      phone_number: '+1 (654) 562 5698',
      document: 'V-5614151',
      date_of_birth: '01/01/1950',
      def_language: 'EN',
      receive_notifications: true,
      picture_url: '',
    },
  },
  receiver: { name: 'Maria', last_name: 'Contreras' },
  origin_office: { place: { address: 'St' } },
  order_price_hist: { order_type: { name: 'Silver' } },
  destination_place: { address: 'Berry Street' },
  status: 'ACTIVE',
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
