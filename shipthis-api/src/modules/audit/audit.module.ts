import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './audit.service';
import { RequestContextModule } from '../request-context/request-context.module';
import { AuditRepository } from './repositories/audit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuditRepository]), RequestContextModule],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
