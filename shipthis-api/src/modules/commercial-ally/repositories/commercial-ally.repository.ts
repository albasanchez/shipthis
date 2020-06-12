import { Repository, EntityRepository } from 'typeorm';
import { CommercialAlly } from '../entities/commercial-ally.entity';

@EntityRepository(CommercialAlly)
export class CommercialAllyRepository extends Repository<CommercialAlly> {}