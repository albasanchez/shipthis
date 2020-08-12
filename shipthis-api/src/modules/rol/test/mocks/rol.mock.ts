import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { RolService } from '../../rol.service';
import { RolRepository } from '../../repositories/rol.repository';

export const rolMockModuleMetadata: ModuleMetadata = {
  providers: [RolService, RolRepository],
  imports: [AppLoggerModule],
};
const newRol  = {
  rol_id: 1,
  name: 'NEW_ROL',
  users: []
}
export class RolMock {
  save() {
    return jest.fn();
  }
  update() {
    return jest.fn();
  }
  
  find() {
    return jest.fn();
  }

  findOne(successful: boolean) {
    return successful? jest.fn().mockResolvedValue(newRol): jest.fn().mockResolvedValue(null);
  }

  delete() {
    return jest.fn();
  }
}