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

@Injectable()
export class CommercialAllySubscriber
  implements EntitySubscriberInterface<CommercialAlly> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private encriptionsService: EncriptionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return CommercialAlly;
  }

  beforeInsert(event: InsertEvent<CommercialAlly>): void {
    this.encriptionsService.encriptObject(event.entity);
  }

  public afterLoad(entity: CommercialAlly) {
    this.encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<CommercialAlly>): void {
    this.encriptionsService.encriptObject(event.entity);
  }
}
