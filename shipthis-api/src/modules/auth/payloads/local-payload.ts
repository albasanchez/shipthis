import { RolName } from '../../rol/constants/rol-name.enum';

export interface ILocalPayload {
  email: string;
  password: string;
  rol?: RolName;
}
