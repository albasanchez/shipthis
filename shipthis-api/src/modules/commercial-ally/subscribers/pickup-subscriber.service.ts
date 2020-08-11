import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EncriptionService } from '../../encription/encription.service';
import { Pickup } from '../entities/pickup.entity';

@Injectable()
export class PickupSubscriber implements EntitySubscriberInterface<Pickup> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly _encriptionsService: EncriptionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Pickup;
  }

  beforeInsert(event: InsertEvent<Pickup>): void {
    this._encriptionsService.encriptObject(event.entity);
  }

  public afterLoad(entity: Pickup) {
    this._encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<Pickup>): void {
    this._encriptionsService.encriptObject(event.entity);
  }
}
