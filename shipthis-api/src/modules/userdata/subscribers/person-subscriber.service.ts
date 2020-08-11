import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EncriptionService } from '../../encription/encription.service';
import { Person } from '../entities/person.entity';

@Injectable()
export class PersonSubscriber implements EntitySubscriberInterface<Person> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private encriptionsService: EncriptionService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Person;
  }

  beforeInsert(event: InsertEvent<Person>): void {
    this.encriptionsService.encriptObject(event.entity);
  }

  public afterLoad(entity: Person) {
    this.encriptionsService.decriptObject(entity);
  }

  beforeUpdate(event: UpdateEvent<Person>): void {
    this.encriptionsService.encriptObject(event.entity);
  }
}
