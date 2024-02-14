import { dataBase } from '../../data_base/db';
import { IUser } from '../../utils/interfaces';

export default function logout(id: number) {
  if (dataBase.connections.has(id)) {
    const userName = dataBase.connections.get(id) as string;
    dataBase.connections.delete(id);
    const user = dataBase.users.get(userName) as IUser;
    user.isActive = false;
  }
}
