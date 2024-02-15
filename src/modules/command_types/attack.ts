import { WebSocket } from 'ws';
import {
  IAttackReq,
  IConnect,
  IGame,
  IPlayer,
  TAttack,
} from '../../utils/interfaces';
import { dataBase } from '../../data_base/db';
import getResponse from '../../utils/getters/get_response';
import getAttack from '../../utils/getters/get_attack';
import isKill from '../../utils/attack/is_kill';
import killShip from '../../utils/attack/kill_ship';
import finish from './finish';

export default function attack(ws: WebSocket, data: string) {
  const dataParse = JSON.parse(data) as IAttackReq;
  const { indexPlayer, gameId } = dataParse;
  let x = dataParse.x;
  let y = dataParse.y;
  const game = dataBase.games.get(gameId) as IGame;
  const P1 = game.players[0] as IPlayer;
  const P2 = game.players[1] as IPlayer;
  const curPlayer = P1.index === indexPlayer ? P1 : P2;
  const enemyPlayer = P1.index !== indexPlayer ? P1 : P2;
  const enemyConnection = dataBase.connections.get(
    enemyPlayer.index,
  ) as IConnect;
  const enemyWs = enemyConnection.socket;
  if (!curPlayer.isTurn) return;

  let type: TAttack = 'miss';
  let turnIndex = curPlayer.index;

  if (x === undefined || y === undefined) {
    for (let row = 2; row > 1; ) {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);
      row = (enemyPlayer.shipsGreed[x] as number[])[y] as number;
    }
  }
  if (x === undefined || y === undefined) return;

  const row = enemyPlayer.shipsGreed[x as number] as number[];
  if ((row[y] as number) > 1) return;
  else if (!row[y]) {
    row[y] = 2;
    curPlayer.isTurn = false;
    enemyPlayer.isTurn = true;
    turnIndex = enemyPlayer.index;
  } else {
    row[y] = 3;
    type = isKill(enemyPlayer.shipsGreed, x, y) ? 'killed' : 'shot';
  }
  const res = getResponse('attack', getAttack(x, y, curPlayer.index, type));
  const turn = JSON.stringify({ currentPlayer: turnIndex });
  const resTurn = getResponse('turn', turn);
  ws.send(JSON.stringify(res));
  ws.send(JSON.stringify(resTurn));
  enemyWs.send(JSON.stringify(res));
  enemyWs.send(JSON.stringify(resTurn));
  if (type === 'killed') {
    killShip(ws, enemyWs, x, y, enemyPlayer.shipsGreed, curPlayer.index);
    enemyPlayer.shipsCount -= 1;
    if (!enemyPlayer.shipsCount) finish(enemyConnection, curPlayer.index);
  }
}
