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

@Injectable()
export class UserdataSubscriber implements EntitySubscriberInterface<Userdata> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private encriptionsService: EncriptionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Userdata;
  }

  beforeInsert(event: InsertEvent<Userdata>): void {
    this.encriptionsService.encriptObject(event.entity);
  }

  public afterLoad(entity: Userdata) {
    this.encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<Userdata>): void {
    this.encriptionsService.encriptObject(event.entity);
  }
}
