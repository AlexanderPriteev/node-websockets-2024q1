import { IDB, IGame, IRoom, IUser } from '../utils/interfaces';

export const dataBase: IDB = {
  users: new Map<string, IUser>(),
  connections: new Map<number, string>(),
  winners: new Map<string, number>(),
  rooms: new Map<string, IRoom>(),
  games: new Map<string, IGame>(),
};
