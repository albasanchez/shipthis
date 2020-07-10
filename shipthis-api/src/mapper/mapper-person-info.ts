import { Pickup } from './../modules/commercial-ally/entities/pickup.entity';
import { Receiver } from './../modules/userdata/entities/receiver.entity';
import { PersonInfoDto } from './../modules/userdata/dto/person-info.dto';
import { Userdata } from './../modules/userdata/entities/userdata.entity';
export class MapperPersonInfo {
  static genratePersonInfoDtoFromUserdata(user: Userdata): PersonInfoDto {
    const person: PersonInfoDto = new PersonInfoDto();
    person.fullname = `${user.person.first_name} ${user.person.last_name}`;
    person.document = user.person.document;
    person.email = user.email;
    person.phone_number = user.person.phone_number;
    return person;
  }

  static generatePersonInfoFromReceiver(receiver: Receiver): PersonInfoDto {
    const person: PersonInfoDto = new PersonInfoDto();
    person.fullname = `${receiver.name} ${receiver.last_name}`;
    person.document = null;
    person.email = receiver.email;
    person.phone_number = receiver.phone_number;
    return person;
  }

  static generateShipperInfoFromPickup(pickup: Pickup): PersonInfoDto {
    const person: PersonInfoDto = new PersonInfoDto();
    person.fullname = pickup.origin_warehouse.commercial_ally.name;
    person.document = null;
    person.email = pickup.origin_warehouse.commercial_ally.email;
    person.phone_number = pickup.origin_warehouse.commercial_ally.phone_number;
    return person;
  }

  static generateReceiverInfoFromPickup(pickup: Pickup): PersonInfoDto {
    const person: PersonInfoDto = new PersonInfoDto();
    person.fullname = `${pickup.rec_name} ${pickup.rec_last_name}`;
    person.document = null;
    person.email = pickup.rec_email;
    person.phone_number = pickup.rec_phone_numer;
    return person;
  }
}
