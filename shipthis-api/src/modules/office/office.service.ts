import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeReposiroty } from './office.repository';
import { Office } from './office.entity';
import { AppLoggerService } from 'src/log/applogger.service';
import { OfficeStatus } from './constants/office-status.enum';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(OfficeReposiroty)
    private readonly _officeRepo: OfficeReposiroty,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async getAllActiveOffices(): Promise<Office[]> {
    this._appLogger.log('Reading all active offices');
    return await this._officeRepo.find({
      where: { status: OfficeStatus.ACTIVE },
    });
  }
}
