import { IDB, IGame, IRoom, IUser, IWinner } from '../utils/interfaces';

export const dataBase: IDB = {
  users: new Map<string, IUser>(),
  connections: new Map<number, string>(),
  winners: new Map<string, IWinner>(),
  rooms: new Map<string, IRoom>(),
  games: new Map<string, IGame>(),
};
