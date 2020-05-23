import { Repository, EntityRepository } from 'typeorm';
import { Person } from './person.entity';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {}
