import { Repository, EntityRepository,getConnection } from 'typeorm';
import { Person } from './person.entity';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Userdata } from '../userdata/userdata.entity';
import { genSalt, hash, compare } from 'bcryptjs';


@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
    
    public async updatePerson(userPerson:UpdatePersonDto){
        await getConnection().createQueryBuilder()
        .update(Person).set({
                             "document" : userPerson.document,
                             "last_name" : userPerson.last_name,
                             "first_name" : userPerson.first_name,
                             "second_last_name": userPerson.second_last_name,
                             "gender" : userPerson.gender,
                             "phone_code" : userPerson.phone_code,
                             "phone_number" : userPerson.phone_number,
                             "date_of_birth" : userPerson.date_of_birth,
                             "def_language" : userPerson.def_language,
                             "receive_notifications": userPerson.receive_notifications,
                             })
                             .where("person_id = :id",{id:userPerson.person_id}).execute()
    }

    public async  userOneFind(id:number){
        return await getConnection()
                    .getRepository(Person)
                    .createQueryBuilder("person")
                    .where("person_id = :id", {id : id})
                    .getOne();
    }

    public async updateUser(userUpdate:UpdatePersonDto){
        const salt = await genSalt(10);
        const password = await hash(userUpdate.password, salt)

        await getConnection().createQueryBuilder().update(Userdata)
        .set({
            "email" : userUpdate.useremail,
            "password": password,
            "username" : userUpdate.username
        }).where("person_fk = :id", {id : userUpdate.person_id}).execute() 
    }

}
