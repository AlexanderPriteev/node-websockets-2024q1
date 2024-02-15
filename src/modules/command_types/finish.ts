import getResponse from '../../utils/getters/get_response';
import { dataBase } from '../../data_base/db';
import { IConnect, IWinner } from '../../utils/interfaces';
import updateWinners from './update_winners';

export default function finish(enemy: IConnect, index: number) {
  const player = dataBase.connections.get(index) as IConnect;
  const win = JSON.stringify({ winPlayer: index });
  const winRes = JSON.stringify(getResponse('finish', win));
  player.socket.send(winRes);
  enemy.socket.send(winRes);
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
