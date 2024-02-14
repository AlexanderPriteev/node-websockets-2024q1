export interface IDB {
  users: Map<string, IUser>;
  connections: Map<number, string>;
  winners: Map<string, IWinner>;
  rooms: Map<string, IRoom>;
  games: Map<string, IGame>;
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
  roomID: number;
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

interface IPlayer {
  index: number;
  name: string;
  ships: IShip[];
}

export interface IGame {
  gameID: number;
  roomID: number;
  isStart: boolean;
  roomUsers: IUser[];
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
