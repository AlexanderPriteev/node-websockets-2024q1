import getResponse from '../../utils/getters/get_response';
import { dataBase } from '../../data_base/db';
import { IConnect, IUser, IWinner } from '../../utils/interfaces';
import updateWinners from './update_winners';

export default function finish(enemy: IConnect | null, index: number) {
  const win = JSON.stringify({ winPlayer: index });
  const winRes = JSON.stringify(getResponse('finish', win));

  if (index) {
    const player = dataBase.connections.get(index) as IConnect;
    player.socket.send(winRes);
    const U1 = dataBase.users.get(player.name) as IUser;
    U1.game = 0;

    if (!enemy) return;

    const winner = dataBase.winners.get(player.name);
    if (winner) {
      winner.wins += 1;
    } else {
      const obj = {
        name: player.name,
        wins: 1,
      } as IWinner;
      dataBase.winners.set(player.name, obj);
    }
    updateWinners();
  }

  if (enemy) {
    enemy.socket.send(winRes);
    const U2 = dataBase.users.get(enemy.name) as IUser;
    U2.game = 0;
  }
}
