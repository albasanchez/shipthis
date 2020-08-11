import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Userdata } from '../entities/userdata.entity';
import { EncriptionService } from '../../encription/encription.service';
import { AuditService } from '../../audit/audit.service';
import { AuditActions } from '../../audit/constants/audit-actions.enum';
import { propertyIsValid } from '../../../config/verify-properties.functions';

@Injectable()
export class UserdataSubscriber implements EntitySubscriberInterface<Userdata> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly _encriptionsService: EncriptionService,
    private readonly _auditService: AuditService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Userdata;
  }

  beforeInsert(event: InsertEvent<Userdata>): void {
    this._encriptionsService.encriptObject(event.entity);
  }

  public afterLoad(entity: Userdata) {
    this._encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<Userdata>): void {
    this._encriptionsService.encriptObject(event.entity);
  }

  async afterUpdate(event: UpdateEvent<any>): Promise<any> {
    this._encriptionsService.decriptObject(event.entity);
    for await (const key of Object.keys(event.entity)) {
      const oldValue: any = event.databaseEntity[key];
      const newValue: any = event.entity[key];

      if (typeof oldValue !== 'object' && typeof newValue !== 'object') {
        if (propertyIsValid(key) && oldValue != newValue) {
          await this._auditService.save({
            action: AuditActions.UPDATE,
            row: event.entity.user_id,
            old_value: oldValue,
            new_value: newValue,
            attribute: key as string,
            table: event.metadata.tableName,
          });
        }
      }
    }
  }
}
