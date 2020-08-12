import { Repository, EntityRepository } from 'typeorm';
import { Audit } from '../entities/audit.entity';

@EntityRepository(Audit)
export class AuditRepository extends Repository<Audit> {
  public async saveTransaction(event: Partial<Audit>): Promise<Audit> {
    return await this.save(event);
  }
}
