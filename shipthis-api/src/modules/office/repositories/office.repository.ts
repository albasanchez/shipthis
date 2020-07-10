import { Office } from './../entities/office.entity';
import { Repository, EntityRepository } from 'typeorm';
import { OfficeStatus } from '../constants/office-status.enum';

@EntityRepository(Office)
export class OfficeReposiroty extends Repository<Office> {
  async getAllActiveOffices(): Promise<Office[]> {
    return this.find({
      where: { status: OfficeStatus.ACTIVE },
    });
  }

  async fetchOffice(id: number): Promise<Office> {
    return this.findOne({
      where: {
        office_id: id,
        status: OfficeStatus.ACTIVE,
      },
    });
  }
}
