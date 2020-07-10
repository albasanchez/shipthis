import { Repository, EntityRepository } from 'typeorm';
import { CheckPoint } from '../entities/check-point.entity';

@EntityRepository(CheckPoint)
export class CheckPointRepository extends Repository<CheckPoint> {
  async updateCheckPoint(check_point_id: number): Promise<void> {
    await this.createQueryBuilder()
      .update()
      .set({ time_mark: new Date(Date.now()).toISOString() })
      .where({ check_point_id: check_point_id })
      .execute();
  }
}
