import { Repository, EntityRepository } from 'typeorm';
import { Receiver } from '../entities/receiver.entity';
import { CreateReceiverDto } from '../dto/create-receiver.dto';
import { Userdata } from '../entities/userdata.entity';
import { ReceiverStatus } from './../../userdata/constants/receiver-status.enum';
import { UpdateReceiverDto } from '../dto/update-receiver.dto';

@EntityRepository(Receiver)
export class ReceiverRepository extends Repository<Receiver> {
  async getReceiver(id: number): Promise<Receiver> {
    return this.findOne({
      where: { receiver_id: id },
    });
  }

  async getReceiverByIdAndStatus(
    id: number,
    status: string,
  ): Promise<Receiver[]> {
    return this.find({
      where: { user: id, status: status },
    });
  }

  async createReceiver(
    newReceiver: CreateReceiverDto,
    user: Userdata,
  ): Promise<any> {
    const rec: Receiver = new Receiver();

    rec.name = newReceiver.name;
    rec.last_name = newReceiver.last_name;
    rec.email = newReceiver.email;
    rec.phone_number = newReceiver.phone_number;
    rec.status = ReceiverStatus.ACTIVE;
    rec.user = user;

    return this.save(rec);
  }

  async updateReceiver(
    id: number,
    newReceiver: UpdateReceiverDto,
  ): Promise<any> {
    this.update(id, newReceiver);

    return { response: 'Receiver has been updated sucessfully' };
  }

  async deleteReceiver(id: number): Promise<any> {
    this.update(id, { status: ReceiverStatus.DELETED });

    return { response: 'Receiver has been deleted sucessfully' };
  }
}
