import { dataBase } from '../../data_base/db';
import { IConnect, IGame, IPlayer, IUser } from '../../utils/interfaces';
import finish from './finish';
import updateRoom from './update_room';

export default function logout(id: number) {
  if (dataBase.connections.has(id)) {
    const userName = dataBase.connections.get(id) as IConnect;
    const user = dataBase.users.get(userName.name) as IUser;
    user.isActive = false;
    if (user.room) {
      dataBase.rooms.delete(user.room);
      user.room = 0;
      updateRoom();
    }
    if (user.game) {
      const game = dataBase.games.get(user.game) as IGame;
      const P1 = (game.players[0] as IPlayer).index;
      const P2 = (game.players[1] as IPlayer).index;
      const index = P1 === id ? P2 : P1;
      finish(userName, index);
    }
    dataBase.connections.delete(id);
  }
}
