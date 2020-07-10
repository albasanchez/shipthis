import { Injectable, BadRequestException } from '@nestjs/common';
import { UserDataRepository } from './repositories/userdata.repository';
import { ReceiverRepository } from './repositories/receiver.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdata } from './entities/userdata.entity';
import { Receiver } from './entities/receiver.entity';
import { ReceiverInfoDto } from './dto/receiverInfo.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { ModifyPasswordDTO } from './dto/modify-password.dto';
import { UpdateUserDataDTO } from './dto/update-userdata.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { ReceiverNotFoundException } from 'src/common/exceptions/receiver-not-found.exception';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { WrongCredentialsException } from 'src/common/exceptions/wrong-credentials.exception';
import { AppLoggerService } from 'src/log/applogger.service';
import { ReceiverStatus } from './constants/receiver-status.enum';
import { UserdataStatus } from './constants/user-status.enum';
import { MapperReceiver } from '../../mapper/mapper-receiver';
import { MapperUser } from '../../mapper/mapper-user';
import { genSalt, hash, compare } from 'bcryptjs';

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

    this._appLogger.log('Handling New Request: Consulting receivers Service');

    const receivers: Receiver[] = await this._receiverRepository.getReceiverByIdAndStatus(
      userid,
      ReceiverStatus.ACTIVE,
    );

    const receiversInfo: ReceiverInfoDto[] = [];

    receivers.forEach(rec => {
      receiversInfo.push(MapperReceiver.ReceiverToReceiverInfo(rec));
    });

    this._appLogger.log('Receivers has been consulted sucessfully');

    return receiversInfo;
  }

  async createReceiver(newReceiver: CreateReceiverDto): Promise<any> {
    this._appLogger.log('Handling New Request: Create Receiver Service');

    const user: Userdata = await this._userdataRepository.getUser(
      newReceiver.user_fk,
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    const receiver: Receiver = await this._receiverRepository.createReceiver(
      newReceiver,
      user,
    );

    this._appLogger.log('New Receiver has been created sucessfully');

    return receiver;
  }

  async updateReceiver(
    id: number,
    newReceiver: UpdateReceiverDto,
  ): Promise<any> {
    this._appLogger.log('Handling New Request: Update Receiver Service');

    const receiver: Receiver = await this._receiverRepository.getReceiver(id);

    if (!receiver) {
      throw new ReceiverNotFoundException();
    }

    const response = this._receiverRepository.updateReceiver(id, newReceiver);

    this._appLogger.log('Receiver has been updated sucessfully');

    return response;
  }

  async deleteReceiver(id: number): Promise<any> {
    this._appLogger.log('Handling New Request: Delete Receiver Service');

    const receiver: Receiver = await this._receiverRepository.getReceiver(id);

    if (!receiver) {
      throw new ReceiverNotFoundException();
    }

    const response = this._receiverRepository.deleteReceiver(id);

    this._appLogger.log('Receiver has been deleted sucessfully');

    return response;
  }

  async getAllUsersInfo(): Promise<UserInfoDto[]> {
    this._appLogger.log('Handling New Request: Consulting Users Service');

    const users: Userdata[] = await this._userdataRepository.getAllUsers();

    const usersInfo: UserInfoDto[] = [];

    users.forEach(user => {
      usersInfo.push(MapperUser.userdataToUserInfo(user));
    });

    this._appLogger.log('Users has been consulted sucessfully');

    return usersInfo;
  }

  async deleteUser(id: number): Promise<any> {
    this._appLogger.log('Handling New Request: Delete User Service');
    const user: Userdata = await this._userdataRepository.getUser(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    user.status = UserdataStatus.DELETED;
    this._userdataRepository.save(user);
    this._appLogger.log('User has been deleted sucessfully');
    return { response: 'User has been deleted sucessfully' };
  }

  async modifyPassword(info: ModifyPasswordDTO) {
    this._appLogger.log('Handling New Request: Modify Password Service');
    let user: Userdata = await this._userdataRepository.getUser(info.user_id);
    if (!user) {
      throw new UserNotFoundException();
    }
    if (!(await compare(info.actual_password, user.password))) {
      throw new WrongCredentialsException();
    }
    const salt = await genSalt(10);
    user.password = await hash(info.new_password, salt);
    await this._userdataRepository.save(user);
    this._appLogger.log('Password change successful');
    return { response: 'Password change successful' };
  }

  async modifyUserdata(info: UpdateUserDataDTO) {
    this._appLogger.log('Handling New Request: Modify User Data Service');
    let user: Userdata = await this._userdataRepository.getUserWithPerson(
      info.user_id,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    user.person.first_name = info.first_name;

    if (info.middle_name !== undefined)
      user.person.middle_name = info.middle_name;

    user.person.last_name = info.last_name;

    if (info.second_last_name !== undefined)
      user.person.second_last_name = info.second_last_name;

    user.person.phone_number = info.phone_number;

    user.person.def_language = info.def_language;

    user.person.picture_url = info.picture_url;

    user.person.receive_notifications = info.receive_notifications;

    await this._userdataRepository.save(user);

    this._appLogger.log('Personal information change successful');
    return { response: 'Personal information change successful', user: user };
  }

  async changeUserStatus(user_id: number, status: UserdataStatus) {
    this._appLogger.log('Handling New Request: Change User Status Service');
    let user: Userdata = await this._userdataRepository.getUserActiveOrBloked(
      user_id,
    );
    if (!user) {
      throw new UserNotFoundException();
    }
    this._userdataRepository.modifyUserStatus(user, status);
    this._appLogger.log('User Status change successful');
    return { response: 'User Status change successful' };
  }
}
