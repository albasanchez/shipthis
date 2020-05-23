import { RolName } from '../rol/constants/rol-name.enum';

export interface IJwtPayload {
  id: number;
  username: string;
  email: string;
  rol: RolName;
  ait?: Date;
}
