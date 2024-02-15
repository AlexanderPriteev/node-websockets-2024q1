import {
  IConnect,
  IDB,
  IGame,
  IRoom,
  IUser,
  IWinner,
} from '../utils/interfaces';

export const dataBase: IDB = {
  users: new Map<string, IUser>(),
  connections: new Map<number, IConnect>(),
  winners: new Map<string, IWinner>(),
  rooms: new Map<number, IRoom>(),
  games: new Map<number, IGame>(),
};
