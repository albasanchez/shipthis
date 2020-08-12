import { Injectable } from '@nestjs/common';
import { RequestContextService } from '../request-context/request-context.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditRepository } from './repositories/audit.repository';
import { Audit } from './entities/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditRepository)
    private readonly _auditRepository: AuditRepository,
    private readonly _requestContextService: RequestContextService,
  ) {}

  public async save(event: Partial<Audit>): Promise<Audit> {
    if (this._requestContextService.getUser()) {
      event.user = { user_id: this._requestContextService.getUser() };
      return await this._auditRepository.saveTransaction(event);
    }
  }
}
