
import { UserData } from "./entity/user_data.entity";
import { Person } from "./entity/person.entity";
import { Rol } from "./entity/rol.entity";

export const objectRepository = [
    {
        provide: 'USER_REPOSITORY',
        useValue: UserData,
    },
    {
        provide: 'PERSON_REPOSITORY',
        useValue: Person,
    },
    {
        provide: 'ROL_REPOSITORY',
        useValue: Rol,
    },
];
