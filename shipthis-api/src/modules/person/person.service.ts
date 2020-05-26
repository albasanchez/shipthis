import { Injectable } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AppLoggerService } from 'src/log/applogger.service';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';

@Injectable()
export class PersonService {

    constructor(private _personRepository : PersonRepository,
        private readonly _appLogger: AppLoggerService,){}

    public async updatePersonService(personUpdate:UpdatePersonDto){

        const validPerson = await this._personRepository.userOneFind(personUpdate.person_id);
        
        if(!validPerson) throw new UserNotFoundException();

        this._appLogger.log(
            'Person update successfully',
        );
        await this._personRepository.updatePerson(personUpdate);
        
        this._appLogger.log(
            'User update successfully',
        );
        await this._personRepository.updateUser(personUpdate)
    }
}
