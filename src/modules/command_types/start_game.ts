import { IConnect, IPlayer } from '../../utils/interfaces';
import { dataBase } from '../../data_base/db';
import getResponse from '../../utils/getters/get_response';

export default function startGame(player: IPlayer, index: number) {
  if (!player.index) return;
  const connection = dataBase.connections.get(player.index) as IConnect;
  const ws = connection.socket;
  const data = { ships: player.ships, currentPlayerIndex: player.index };
  const dataStr = JSON.stringify(data);
  const turn = JSON.stringify({ currentPlayer: index || player.index});
  player.isTurn = index === player.index || !index;
  const res = JSON.stringify(getResponse('start_game', dataStr));
  const resTurn = JSON.stringify(getResponse('turn', turn));
  ws.send(res);
  ws.send(resTurn);
}
