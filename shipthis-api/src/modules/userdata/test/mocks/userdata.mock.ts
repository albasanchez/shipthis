import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { UserdataService } from '../../userdata.service';
import { UserDataRepository } from '../../repositories/userdata.repository';
import { ConfigService } from '../../../../config/config.service';
import { ReceiverRepository } from '../../repositories/receiver.repository';
import { LanguageType } from '../../constants/language.enum';
import { UserdataStatus } from '../../constants/user-status.enum';

export const userdataMockModuleMetadata: ModuleMetadata = {
  providers: [
    UserdataService,
    UserDataRepository,
    ReceiverRepository,
    {
      provide: ConfigService,
      useFactory() {
        return {
          get: jest.fn().mockReturnValue(1),
        };
      },
    },
  ],
  imports: [AppLoggerModule],
};

export class UserdataMock {
  save() {
    return jest.fn();
  }
  find(person: boolean) {
    if (!person) {
      return jest.fn().mockResolvedValue([
        {
          user_id: 1,
          first_name: 'Luisa',
          middle_name: 'Maria',
          last_name: 'Contreras',
          second_last_name: 'Lara',
          phone_number: '+1 (654) 562 5698',
          def_language: LanguageType.ENGLISH,
          picture_url: null,
          receive_notifications: true,
        },
        {
          user_id: 2,
          first_name: 'Mary',
          middle_name: 'Matilda',
          last_name: 'Contreras',
          second_last_name: 'Pereira',
          phone_number: '+1 (654) 562 5698',
          def_language: LanguageType.ENGLISH,
          picture_url: null,
          receive_notifications: true,
        },
      ]);
    } else {
      return jest.fn().mockResolvedValue([
        {
          user_id: 1,
          email: 'luisa@gmail.com',
          status: 'ACTIVE',
          def_language: LanguageType.ENGLISH,
          receive_notifications: true,
          registration_date: '01/01/2020',
          registration_type: 'FEDERATED',
          person: {
            first_name: 'Luisa',
            middle_name: 'Maria',
            last_name: 'Contreras',
            second_last_name: 'Lara',
            phone_number: '+1 (654) 562 5698',
            document: 'V-5614151',
            date_of_birth: '01/01/1950',
          },
          rol: { name: 'CLIENT' },
        },
      ]);
    }
  }

  findOne(successful: boolean, person: boolean) {
    if (successful) {
      return jest
        .fn()
        .mockResolvedValue({
          user_id: 1,
          first_name: 'Luisa',
          middle_name: 'Maria',
          last_name: 'Contreras',
          second_last_name: 'Lara',
          phone_number: '+1 (654) 562 5698',
          def_language: LanguageType.ENGLISH,
          picture_url: null,
          receive_notifications: true,
          password:
            '$2a$10$BvTbn6JsYqeziS4FfJ0FKOZ4GXA3wTye5uItQ4uhkcQjopPOAOSgG',
        });
    } else if (person) {
      return jest.fn().mockResolvedValue({
        user_id: 1,
        email: 'luisa@gmail.com',
        status: 'ACTIVE',
        registration_date: '01/01/2020',
        registration_type: 'FEDERATED',
        person: {
          first_name: 'Luisa',
          middle_name: 'Maria',
          last_name: 'Contreras',
          second_last_name: 'Lara',
          phone_number: '+1 (654) 562 5698',
          document: 'V-5614151',
          date_of_birth: '01/01/1950',
          def_language: LanguageType.ENGLISH,
          receive_notifications: true,
          picture_url: '',
        },
        rol: { name: 'CLIENT' },
      });
    } else {
      return jest.fn().mockResolvedValue(null);
    }
  }

  update() {
    return jest.fn();
  }

  query(condition: string) {
    if(condition == 'more'){
    return jest.fn().mockResolvedValue([{ user_id:1, first_name: 'Luisa', 
    middle_name: 'Maria', last_name: 'Contreras', 
    second_last_name: 'Lara', phone_number:'+1 (654) 562 5698', 
    def_language: LanguageType.ENGLISH, picture_url: null,  
    receive_notifications: true},
    { user_id:2, first_name: 'Mary', 
    middle_name: 'Matilda', last_name: 'Contreras', 
    second_last_name: 'Pereira', phone_number:'+1 (654) 562 5698', 
    def_language: LanguageType.ENGLISH, picture_url: null,  
    receive_notifications: true}]);
  } else {
    
    return jest.fn().mockResolvedValue([{ user_id:3, first_name: 'Luisa', 
    middle_name: 'Maria', last_name: 'Contreras', 
    second_last_name: 'Lara', phone_number:'+1 (654) 562 5698', 
    def_language: LanguageType.ENGLISH, picture_url: null,  
    receive_notifications: true},
    { user_id:4, first_name: 'Mary', 
    middle_name: 'Matilda', last_name: 'Contreras', 
    second_last_name: 'Pereira', phone_number:'+1 (654) 562 5698', 
    def_language: LanguageType.ENGLISH, picture_url: null,  
    receive_notifications: true}]);
   }
  }

}

export const getLatestUsersCreateQueryBuilder: any = {
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  getMany: jest.fn().mockReturnValue([{ user_id:1, first_name: 'Luisa', 
  middle_name: 'Maria', last_name: 'Contreras', 
  second_last_name: 'Lara', phone_number:'+1 (654) 562 5698', 
  def_language: LanguageType.ENGLISH, picture_url: null,  
  receive_notifications: true},
  { user_id:2, first_name: 'Mary', 
  middle_name: 'Matilda', last_name: 'Contreras', 
  second_last_name: 'Pereira', phone_number:'+1 (654) 562 5698', 
  def_language: LanguageType.ENGLISH, picture_url: null,  
  receive_notifications: true}]),
};
