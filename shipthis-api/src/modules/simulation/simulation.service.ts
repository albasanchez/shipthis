import { CheckPointRepository } from './../check-point/check-point.repository';
import { CheckPoint } from './../check-point/check-point.entity';
import { OrdersheetStatus } from './../ordersheet/constants/ordersheet-status.enum';
import { OrdersheetRepository } from './../ordersheet/ordersheet.repository';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Ordersheet } from '../ordersheet/ordersheet.entity';
import { getConnection, Not } from 'typeorm';
import { AppLoggerService } from 'src/log/applogger.service';

@Injectable()
export class SimulationService {
  constructor(private readonly _appLogger: AppLoggerService) {}
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this._appLogger.log('UNATTENDED SERVICE: simulating order movement');
    //search all orders with status different from DELIVERED
    const interestOrders: Ordersheet[] = await this.searchNotDeliveredOrders();
    //Modify ordersheets
    this._appLogger.log(
      `UNATTENDED SERVICE: modifitying ${interestOrders.length} order(s)`,
    );
    for await (const order of interestOrders) {
      if (order.status === OrdersheetStatus.DELIVERY) {
        if (order.trajectories.check_points.length !== 0) {
          order.trajectories.check_points = order.trajectories.check_points.sort(
            (a, b) => (a.check_point_order > b.check_point_order ? 1 : -1),
          );
          await this.updateCheckPoint(order.trajectories.check_points[0]);
          await this.updateOrdersheetStatus(order, OrdersheetStatus.TRANSIT);
        } else {
          await this.updateOrdersheetStatus(order, OrdersheetStatus.DELIVERED);
        }
      } else {
        let flag: boolean = true;
        order.trajectories.check_points = order.trajectories.check_points.sort(
          (a, b) => (a.check_point_order > b.check_point_order ? 1 : -1),
        );
        for await (const checkPoint of order.trajectories.check_points) {
          if (!checkPoint.time_mark) {
            flag = false;
            await this.updateCheckPoint(checkPoint);
            break;
          }
        }
        if (flag) {
          await this.updateOrdersheetStatus(order, OrdersheetStatus.DELIVERED);
        }
      }
    }
  }

  private async searchNotDeliveredOrders(): Promise<Ordersheet[]> {
    const ordersheetRepo: OrdersheetRepository = getConnection().getRepository(
      Ordersheet,
    );
    return await ordersheetRepo.find({
      where: { status: Not(OrdersheetStatus.DELIVERED) },
    });
  }

  private async updateOrdersheetStatus(
    order: Ordersheet,
    newStatus: string,
  ): Promise<void> {
    const date: Date =
      newStatus === OrdersheetStatus.DELIVERED ? new Date() : null;
    const ordersheetRepo: OrdersheetRepository = getConnection().getRepository(
      Ordersheet,
    );
    await ordersheetRepo
      .createQueryBuilder()
      .update()
      .set({ status: newStatus, delivery_date: date })
      .where({ ordersheet_id: order.ordersheet_id })
      .execute();
  }

  private async updateCheckPoint(checkPoint: CheckPoint): Promise<void> {
    const checkPointRepo: CheckPointRepository = getConnection().getRepository(
      CheckPoint,
    );
    await checkPointRepo
      .createQueryBuilder()
      .update()
      .set({ time_mark: new Date(Date.now()).toISOString() })
      .where({ check_point_id: checkPoint.check_point_id })
      .execute();
  }
}
