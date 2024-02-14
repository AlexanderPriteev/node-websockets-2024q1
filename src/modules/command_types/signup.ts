import { dataBase } from '../../data_base/db';
import { IUser } from '../../utils/interfaces';
import {
  ERROR_IS_ACTIVE,
  ERROR_PASSWORD,
  INVALID_INPUT,
} from '../../utils/const';
import { WebSocket } from 'ws';
import getUser from '../../utils/getters/get_user';
import getResponse from '../../utils/getters/get_response';
import updateWinners from './update_winners';
import updateRoom from './update_room';

export default function signup(req: string, id: number, ws: WebSocket): void {
  try {
    const data = JSON.parse(req);
    const res: IUser = getUser(data.name, id);
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

    const result = getResponse('reg', JSON.stringify(res));
    ws.send(JSON.stringify(result));
    updateRoom(ws);
    updateWinners(ws);
  } catch {
    console.log(INVALID_INPUT);
  }
}
