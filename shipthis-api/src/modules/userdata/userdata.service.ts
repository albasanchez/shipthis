import { Injectable, BadRequestException } from '@nestjs/common';
import { UserDataRepository } from './repositories/userdata.repository';
import { ReceiverRepository } from './repositories/receiver.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdata } from './entities/userdata.entity';
import { Receiver } from './entities/receiver.entity';
import { ReceiverInfoDto} from './dto/receiverInfo.dto';
import { ReceiverNotFoundException } from 'src/common/exceptions/receiver-not-found.exception';

@Injectable()
export class UserdataService {
    constructor(
        @InjectRepository(ReceiverRepository)
        private readonly _receiverRepository: ReceiverRepository,
      ) {}

    async getReceivers(userid: number): Promise<ReceiverInfoDto[]> {
        if (!userid) {
          throw new BadRequestException('id must be sent');
        }
    
        const receivers: Receiver[] = await this._receiverRepository.find({
            where: { user: userid },
          });

        const receiversInfo: ReceiverInfoDto[] = [];

        receivers.forEach(rec => {
            receiversInfo.push({
              name : rec.name,
              last_name: rec.last_name,
              phone_number: rec.phone_numer,
              email : rec.email,
            })
          });
    
       if (receiversInfo.length===0) {
          throw new ReceiverNotFoundException();
        }  
    
        return receiversInfo;
      } 
}
