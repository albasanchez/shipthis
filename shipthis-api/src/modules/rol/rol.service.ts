import { Injectable, BadRequestException } from '@nestjs/common';
import { RolRepository } from './repositories/rol.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { RolNotFoundException } from 'src/common/exceptions/rol-not-found.exception';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(RolRepository)
    private readonly _rolRepository: RolRepository,
  ) {}

  async get(id: number): Promise<Rol> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const rol: Rol = await this._rolRepository.findOne(id);

    if (!rol) {
      throw new RolNotFoundException();
    }

    return rol;
  }

  async gelAll(): Promise<Rol[]> {
    const rols: Rol[] = await this._rolRepository.find();
    return rols;
  }

  async create(rol: Rol): Promise<Rol> {
    const savedRol = await this._rolRepository.save(rol);
    return savedRol;
  }

  async update(id: number, rol: Rol): Promise<void> {
    const existRol: Rol = await this.get(id);
    await this._rolRepository.update(id, rol);
  }

  async delete(id: number): Promise<void> {
    const existRol: Rol = await this.get(id);
    await this._rolRepository.delete(id);
  }
}
