import { Repository, EntityRepository } from 'typeorm';
import { Receiver } from '../entities/receiver.entity';

@EntityRepository(Receiver)
export class ReceiverRepository extends Repository<Receiver> {}
