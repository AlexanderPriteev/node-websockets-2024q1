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
import botAttack from '../../utils/bot/bot_attack';

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
  if (!enemyPlayer.index) {
    botAttack(ws, dataParse, game);
    return;
  }
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
      row = (enemyPlayer.shipsGrid[x] as number[])[y] as number;
    }
  }
  if (x === undefined || y === undefined) return;

  const row = enemyPlayer.shipsGrid[x as number] as number[];
  let isRes = true;
  if ((row[y] as number) !== 1) {
    curPlayer.isTurn = false;
    enemyPlayer.isTurn = true;
    turnIndex = enemyPlayer.index;
    if (!row[y]) row[y] = 2;
    else isRes = false;
  }
  else {
    row[y] = 3;
    type = isKill(enemyPlayer.shipsGrid, x, y) ? 'killed' : 'shot';
  }
  const res = getResponse('attack', getAttack(x, y, curPlayer.index, type));
  const turn = JSON.stringify({ currentPlayer: turnIndex });
  const resTurn = getResponse('turn', turn);
  if(isRes) ws.send(JSON.stringify(res));
  ws.send(JSON.stringify(resTurn));
  if(isRes) enemyWs.send(JSON.stringify(res));
  enemyWs.send(JSON.stringify(resTurn));
  if (type === 'killed') {
    killShip(ws, enemyWs, x, y, enemyPlayer.shipsGrid, curPlayer.index);
    enemyPlayer.shipsCount -= 1;
    if (!enemyPlayer.shipsCount) finish(enemyConnection, curPlayer.index);
  }
}
