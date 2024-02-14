import { dataBase } from '../db';
import { IUser } from '../../utils/interfaces';
import {
  ERROR_IS_ACTIVE,
  ERROR_PASSWORD,
  INVALID_INPUT,
} from '../../utils/const';

export default function signup(req: string, id: number): string {
  try {
    const data = JSON.parse(req);
    const res: IUser = {
      name: data.name,
      index: id,
      error: false,
      errorText: '',
    };
    if (dataBase.users.has(data.name)) {
      const user = dataBase.users.get(data.name) as IUser;
      if (user.password !== data.password) {
        res.errorText = ERROR_PASSWORD;
      } else if (user.isActive) {
        res.errorText = ERROR_IS_ACTIVE;
      } else {
        user.index = id;
      }
      res.error = !!res.errorText;
    } else {
      dataBase.users.set(data.name, {
        name: data.name,
        index: res.index,
        password: data.password,
        isActive: true,
      });
    }
    if (!res.error) {
      dataBase.connections.set(id, data.name);
    }
    return JSON.stringify(res);
  } catch {
    return INVALID_INPUT;
  }
}
