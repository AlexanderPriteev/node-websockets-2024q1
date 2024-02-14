import { dataBase } from '../../data_base/db';
import {IConnect, IUser} from '../../utils/interfaces';

export default function logout(id: number) {
  if (dataBase.connections.has(id)) {
    const userName = dataBase.connections.get(id) as IConnect;
    dataBase.connections.delete(id);
    const user = dataBase.users.get(userName.name) as IUser;
    user.isActive = false;
  }
}
