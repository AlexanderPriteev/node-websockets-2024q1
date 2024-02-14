import {WebSocket} from "ws";

export interface IDB {
  users: Map<string, IUser>;
  connections: Map<number, IConnect>;
  winners: Map<string, IWinner>;
  rooms: Map<number, IRoom>;
  games: Map<number, IGame>;
}

export interface IConnect{
  name: string;
  socket: WebSocket;
}

export interface IResult {
  type: string;
  data: string;
  id: 0;
}

export interface IUser {
  name: string;
  index: number;
  password?: string;
  isActive?: boolean;
  error?: boolean;
  errorText?: string;
  room?: number;
  game?: number;
}

export interface IWinner {
  name: string;
  wins: number;
}

export interface IRoom {
  roomId: number;
  roomUsers: IUser[];
  isGame: boolean;
  payersCount: number;
}

export interface IShip {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface IPlayer {
  index: number;
  name: string;
  ships: IShip[];
}

export interface IGame {
  gameId: number;
  roomId: number;
  isStart: boolean;
  players: IPlayer[];
}

export interface IAttack {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: number;
  status: 'miss' | 'killed' | 'shot';
}
