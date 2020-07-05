import { CheckPointRepository } from '../ordersheet/repositories/check-point.repository';
import { CheckPoint } from '../ordersheet/entities/check-point.entity';
import { OrdersheetStatus } from './../ordersheet/constants/ordersheet-status.enum';
import { OrdersheetRepository } from '../ordersheet/repositories/ordersheet.repository';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout, SchedulerRegistry } from '@nestjs/schedule';
import { Ordersheet } from '../ordersheet/entities/ordersheet.entity';
import { AppLoggerService } from 'src/log/applogger.service';
import { Simulation } from './entities/simulation.entity';
import { SimulationRepository } from './repositories/simulation.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { NewConfigTimeDto } from './dto/new-config-time.dto';
import { CronTime } from "cron";

@Injectable()
export class SimulationService {
  constructor(private readonly _appLogger: AppLoggerService,
    @InjectRepository (SimulationRepository)
    private readonly _simulationRepo: SimulationRepository,
    @InjectRepository (OrdersheetRepository)
    private readonly _ordersheetRepo: OrdersheetRepository,
    @InjectRepository (CheckPointRepository)
    private readonly _checkPointRepo: CheckPointRepository,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Timeout(1000)
  async getExcutionTime() {
    this._appLogger.log('UNATTENDED SERVICE: Setting execution time');
    const config : Simulation = await this.getCurrentConfigTime()
    const time : CronTime = new CronTime(`0 */${config.config_time} * * * *`,'','');
    const job = this.schedulerRegistry.getCronJob('simulation');
    job.setTime(time);
    job.start()
    this._appLogger.log(`UNATTENDED SERVICE: Execution set to run every ${config.config_time}  minute(s)`);
  }

  @Cron(CronExpression.EVERY_5_MINUTES,{
    name: 'simulation',
  })
  async handleCron() {
    this._appLogger.log('UNATTENDED SERVICE: simulating order movement');
    //search all orders with status different from DELIVERED
    const interestOrders: Ordersheet[] = await this.searchNotDeliveredOrders()
    //Modify ordersheets
    this._appLogger.log(
      `UNATTENDED SERVICE: modifiying ${interestOrders.length} order(s)`,
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
    return await this._ordersheetRepo.searchNotDeliveredOrders()
  }

  private async updateOrdersheetStatus(
    order: Ordersheet,
    newStatus: string,
  ): Promise<void> {
    const date: Date =
      newStatus === OrdersheetStatus.DELIVERED ? new Date() : null;
    await this._ordersheetRepo.updateOrdersheetStatus(order.ordersheet_id, newStatus, date)
  }  

  private async updateCheckPoint(checkPoint: CheckPoint): Promise<void> {
    await this._checkPointRepo.updateCheckPoint(checkPoint.check_point_id)
  }

  async getCurrentConfigTime(): Promise<Simulation> {
    return this._simulationRepo.getCurrentConfigTime();
  }

  async updateConfigTime(newRegister: NewConfigTimeDto): Promise<NewConfigTimeDto> {
    const newConfig : NewConfigTimeDto = await this._simulationRepo.updateConfigTime(newRegister);
    await this.getExcutionTime();
    return newConfig;
  } 
}
