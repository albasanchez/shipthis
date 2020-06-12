import { Office } from './entities/office.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeReposiroty } from './repositories/office.repository';
import { AppLoggerService } from 'src/log/applogger.service';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(OfficeReposiroty)
    private readonly _officeRepo: OfficeReposiroty,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async getAllActiveOffices(): Promise<Office[]> {
    this._appLogger.log('Reading all active offices');
    return this._officeRepo.getAllActiveOffices();
  }
}
