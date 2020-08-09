import { registeredPickup } from './constants';

export class PickupMock {
  save() {
    return jest.fn().mockResolvedValue(registeredPickup);
  }
  findOne(successful: boolean) {
    if (successful) {
      return jest.fn().mockResolvedValue(registeredPickup);
    } else {
      return jest.fn().mockResolvedValue(undefined);
    }
  }
  find() {
    return jest.fn().mockResolvedValue([registeredPickup]);
  }
}
