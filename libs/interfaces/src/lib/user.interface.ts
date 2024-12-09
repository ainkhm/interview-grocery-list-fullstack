import { ENUMS } from './enums';
export interface IUser {
  id?: string;
  email: string;
  password: string;
  name?: string | null;
  role: ENUMS.Role;
}

export interface IGrocery {
  id: string;
  userId: string;
  name: string;
  status: ENUMS.Status;
  priority?: number | null;
  quantity?: number | null;
  lastStatusChanged?: Date | null;
}

export type IGroceryView = Omit<IGrocery, 'userId'>;
export type IUserView = Omit<IUser, 'password'>;

export interface Request {
  user?: IUserView;
  logout: () => string;
}
