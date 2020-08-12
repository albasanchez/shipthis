import { RolName } from '../../../../modules/rol/constants/rol-name.enum';

export class RoleMock {
    save() {
        return jest.fn();
    }
    find() {
        return jest.fn();
    }
    findOne(role: String) {
        if (role === RolName.CLIENT) {
            return jest.fn().mockResolvedValue({ name: RolName.CLIENT })
        } else if (role === RolName.ADMIN) {
            return jest.fn().mockResolvedValue({ name: RolName.ADMIN })
        }
    }
}