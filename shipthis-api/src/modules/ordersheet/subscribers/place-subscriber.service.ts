import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EncriptionService } from '../../encription/encription.service';
import { Place } from '../entities/place.entity';

@Injectable()
export class PlaceSubscriber implements EntitySubscriberInterface<Place> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly _encriptionsService: EncriptionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Place;
  }

  beforeInsert(event: InsertEvent<Place>): void {
    this._encriptionsService.encriptObject(event.entity);
  }

  public afterLoad(entity: Place) {
    this._encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<Place>): void {
    this._encriptionsService.encriptObject(event.entity);
  }
}
