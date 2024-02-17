import { WebSocket } from 'ws';
import { IAttackReq, IGame, IPlayer, TAttack } from '../interfaces';
import isKill from '../attack/is_kill';
import getResponse from '../getters/get_response';
import getAttack from '../getters/get_attack';
import killShip from '../attack/kill_ship';
import finish from '../../modules/command_types/finish';
import botMove from './bot_move';

export default function botAttack(
  ws: WebSocket,
  data: IAttackReq,
  game: IGame,
) {
  let x = data.x;
  let y = data.y;
  const bot = game.players[0] as IPlayer;
  const curPlayer = game.players[1] as IPlayer;

  let type: TAttack = 'miss';
  const turnIndex = curPlayer.index;

  if (x === undefined || y === undefined) {
    for (let row = 2; row > 1; ) {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);
      row = (bot.shipsGrid[x] as number[])[y] as number;
    }
  }
  if (x === undefined || y === undefined) return;

  const row = bot.shipsGrid[x as number] as number[];

  if ((row[y] as number) !== 1)  {
    if (!row[y]) {
      row[y] = 2;
      const res = getResponse('attack', getAttack(x, y, curPlayer.index, type));
      ws.send(JSON.stringify(res));
    }
    const turn = getResponse('turn', JSON.stringify({ currentPlayer: 0 }));
    ws.send(JSON.stringify(turn));
    const isFinish = botMove(curPlayer);
    if (isFinish) return;
  } else {
    row[y] = 3;
    type = isKill(bot.shipsGrid, x, y) ? 'killed' : 'shot';
  }

  if (type !== 'miss') {
    const res = getResponse('attack', getAttack(x, y, curPlayer.index, type));
    ws.send(JSON.stringify(res));
  }

  const turn = JSON.stringify({ currentPlayer: turnIndex });
  const resTurn = getResponse('turn', turn);
  ws.send(JSON.stringify(resTurn));

  if (type === 'killed') {
    killShip(ws, null, x, y, bot.shipsGrid, curPlayer.index);
    bot.shipsCount -= 1;
    if (!bot.shipsCount) finish(null, curPlayer.index);
  }
}
