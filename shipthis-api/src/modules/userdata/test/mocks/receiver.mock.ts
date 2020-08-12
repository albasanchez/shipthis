import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { ReceiverRepository } from '../../repositories/receiver.repository';


export const receiverMockModuleMetadata: ModuleMetadata = {
  providers: [ ReceiverRepository],
  imports: [AppLoggerModule],
};

export class ReceiverMock {
  save() {
    return jest
      .fn()
      .mockResolvedValue({
        name: 'Ana',
        last_name: 'Lopez',
        phone_number: '+1 (654) 562 5698',
        email: 'analopez1998@gmail.com',
        user_fk: 1,
      });
  }
  find() {
    return jest.fn().mockResolvedValue([{ name: 'Ana', 
    last_name: 'Lopez',
    phone_number:'+1 (654) 562 5698', 
    email: 'analopez1998@gmail.com',
    user_fk: 1 },
   
    { name: 'Paola', 
    last_name: 'Lopez',
    phone_number:'+1 (654) 135 5698', 
    email: 'paolopez1998@gmail.com',
    user_fk: 1 }]);
  }
  
  findOne(status: string) {
    if (status == 'Active') {
      return jest.fn().mockResolvedValue({ name: 'Laura', 
      last_name: 'Ledezma',
      phone_number:'+1 (654) 562 5698', 
      email: 'laura1998@gmail.com',
      user_fk: 1 });
    } else {
      return jest.fn().mockResolvedValue(null);
    }
  }

  update() {
    return jest.fn();
  }
}