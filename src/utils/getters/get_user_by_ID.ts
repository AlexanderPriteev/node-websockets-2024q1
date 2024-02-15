import { dataBase } from '../../data_base/db';
import { IConnect, IUser } from '../interfaces';

export default function getUserByID(id: number) {
  const userName = dataBase.connections.get(id) as IConnect;
  return dataBase.users.get(userName.name) as IUser;
}
