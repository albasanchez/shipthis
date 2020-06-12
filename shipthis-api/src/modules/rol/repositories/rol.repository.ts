import { Repository, EntityRepository } from 'typeorm';
import { Rol } from '../entities/rol.entity';

@EntityRepository(Rol)
export class RolRepository extends Repository<Rol> {}
