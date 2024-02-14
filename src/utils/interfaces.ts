export interface IDB {
  users: Map<string, IUser>;
  connections: Map<number, string>;
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
}
