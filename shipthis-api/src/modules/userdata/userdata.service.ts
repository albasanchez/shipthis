import { Injectable, BadRequestException } from '@nestjs/common';
import { UserDataRepository } from './repositories/userdata.repository';
import { ReceiverRepository } from './repositories/receiver.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdata } from './entities/userdata.entity';
import { Receiver } from './entities/receiver.entity';
import { ReceiverInfoDto} from './dto/receiverInfo.dto';
import { UpdateReceiverDto} from './dto/update-receiver.dto';
import { CreateReceiverDto} from './dto/create-receiver.dto';
import { ReceiverNotFoundException } from 'src/common/exceptions/receiver-not-found.exception';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { AppLoggerService } from 'src/log/applogger.service';
import { ReceiverStatus } from './constants/receiver-status.enum';
import { MapperReceiver } from '../../mapper/mapper-receiver';

@Injectable()
export class UserdataService {
    constructor(
        @InjectRepository(ReceiverRepository)
        private readonly _receiverRepository: ReceiverRepository,
        @InjectRepository(UserDataRepository)
        private readonly _userdataRepository: UserDataRepository,
        private readonly _appLogger: AppLoggerService,
      ) {}

      async getReceivers(userid: number): Promise<ReceiverInfoDto[]> {

        if (!userid) {
          throw new BadRequestException('Userid is expected');
        }
    
        const receivers: Receiver[] = await this._receiverRepository.find({
            where: { user: userid, status: ReceiverStatus.ACTIVE },
          });

        const receiversInfo: ReceiverInfoDto[] = [];

        receivers.forEach(rec => {
            receiversInfo.push(MapperReceiver.ReceiverToReceiverInfo(rec))
          });
    
        return receiversInfo;
      } 

     async createReceiver(newReceiver: CreateReceiverDto): Promise<any> {

        this._appLogger.log('Handling New Request: Create Receiver Service');

        const user: Userdata = await this._userdataRepository.getUser(newReceiver.user_fk);

        if(!user) {
          throw new UserNotFoundException();
      }

        const receiver: Receiver = await this._receiverRepository.createReceiver(newReceiver, user);

        this._appLogger.log('New Receiver has been created sucessfully');

        return receiver;
     } 

     async updateReceiver(id: number, newReceiver: UpdateReceiverDto): Promise<any> {

      this._appLogger.log('Handling New Request: Update Receiver Service');

      const receiver: Receiver = await this._receiverRepository.getReceiver(id);

      if(!receiver) {
          throw new ReceiverNotFoundException();
      }
       
      const response = this._receiverRepository.updateReceiver(id, newReceiver);

      this._appLogger.log('Receiver has been updated sucessfully');

      return response;
   } 

     async deleteReceiver(id: number): Promise<any> {

      this._appLogger.log('Handling New Request: Delete Receiver Service');

      const receiver: Receiver = await this._receiverRepository.getReceiver(id);

      if(!receiver) {
          throw new ReceiverNotFoundException();
      }

      const response = this._receiverRepository.deleteReceiver(id);

      this._appLogger.log('Receiver has been deleted sucessfully');
       
      return response;
   } 
   
}
