import { ReceiverInfoDto } from '../modules/userdata/dto/receiverInfo.dto';
import { Receiver } from '../modules/userdata/entities/receiver.entity';

export class MapperReceiver {

    static ReceiverToReceiverInfo(receiver: Receiver): ReceiverInfoDto{

        const receiverInfo: ReceiverInfoDto = {
              id: receiver.receiver_id,
              name : receiver.name,
              last_name: receiver.last_name,
              phone_number: receiver.phone_number,
              email : receiver.email,
        };

        return receiverInfo;
    }
}