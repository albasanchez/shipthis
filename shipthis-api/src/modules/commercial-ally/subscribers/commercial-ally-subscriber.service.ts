import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EncriptionService } from '../../encription/encription.service';
import { CommercialAlly } from '../entities/commercial-ally.entity';
import { propertyIsValid } from '../../../config/verify-properties.functions';
import { AuditActions } from '../../audit/constants/audit-actions.enum';
import { AuditService } from '../../audit/audit.service';

@Injectable()
export class CommercialAllySubscriber
  implements EntitySubscriberInterface<CommercialAlly> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly _encriptionsService: EncriptionService,
    private readonly _auditService: AuditService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return CommercialAlly;
  }

  beforeInsert(event: InsertEvent<CommercialAlly>): void {
    this._encriptionsService.encriptObject(event.entity);
  }

  public afterLoad(entity: CommercialAlly) {
    this._encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<CommercialAlly>): void {
    this._encriptionsService.encriptObject(event.entity);
  }

  async afterUpdate(event: UpdateEvent<any>): Promise<any> {
    this._encriptionsService.decriptObject(event.entity);
    for await (const key of Object.keys(event.entity)) {
      const oldValue: any = event.databaseEntity[key];
      const newValue: any = event.entity[key];

      if (propertyIsValid(key) && oldValue != newValue) {
        await this._auditService.save({
          action: AuditActions.UPDATE,
          row: event.entity.commercial_ally_id,
          old_value: oldValue,
          new_value: newValue,
          attribute: key as string,
          table: event.metadata.tableName,
        });
      }
    }
  }
}
