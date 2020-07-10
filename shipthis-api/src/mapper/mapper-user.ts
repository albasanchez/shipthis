import { UserInfoDto } from '../modules/userdata/dto/user-info.dto';
import { Userdata } from '../modules/userdata/entities/userdata.entity';

export class MapperUser {

    static userdataToUserInfo(user: Userdata): UserInfoDto {

        const userInfo: UserInfoDto = {
            id: user.user_id,
            useremail: user.email,
            document: user.person.document,
            first_name: user.person.first_name,
            middle_name: user.person.middle_name,
            last_name: user.person.last_name,
            second_last_name: user.person.second_last_name,
            phone_number: user.person.phone_number,
            date_of_birth: user.person.date_of_birth,
            registration_date: user.registration_date,
            registration_type: user.registration_type,
            role: user.rol.name,
            status: user.status
        }
        return userInfo;
    }

    static userToUserInfo(user: any) {

        const userInfo = {
            user_id: user.user_id,
            user_email: user.email,
            first_name: user.person.first_name,
            last_name: user.person.last_name
        }
        return userInfo;
    }
}