import { IDB, IUser } from '../utils/interfaces';

export const dataBase: IDB = {
  users: new Map<string, IUser>(),
  connections: new Map<number, string>(),
};
