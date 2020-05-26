import { Controller, Get, Req ,  Body, Post,} from '@nestjs/common';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {

    constructor(private readonly _personService: PersonService){}
  
  @Post('/update')
  async personUpdate(@Body() personDto:UpdatePersonDto) {
        return this._personService.updatePersonService(personDto)
  }
}
