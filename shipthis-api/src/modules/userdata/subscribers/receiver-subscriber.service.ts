import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Receiver } from '../entities/receiver.entity';
import { EncriptionService } from '../../encription/encription.service';

@Injectable()
export class ReceiverSubscriber implements EntitySubscriberInterface<Receiver> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private encriptionsService: EncriptionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Receiver;
  }

  beforeInsert(event: InsertEvent<Receiver>): void {
    this.encriptionsService.encriptObject(event.entity);
  }

  public afterLoad(entity: Receiver) {
    this.encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<Receiver>): void {
    this.encriptionsService.encriptObject(event.entity);
  }
}
