const pickup = {
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

export class PickupMock {
  save() {
    return jest.fn().mockResolvedValue(pickup);
  }
}
