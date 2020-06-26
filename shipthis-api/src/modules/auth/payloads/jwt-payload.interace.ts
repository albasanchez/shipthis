import { RolName } from '../../rol/constants/rol-name.enum';

export interface IJwtPayload {
  id: number;
  email: string;
  rol: RolName;
  ait?: Date;
}
