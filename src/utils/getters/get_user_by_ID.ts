import { dataBase } from '../../data_base/db';
import { IUser } from '../interfaces';

export default function getUserByID(id: number) {
  const userName = dataBase.connections.get(id) as string;
  return dataBase.users.get(userName) as IUser;
}
