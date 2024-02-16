import getResponse from '../getters/get_response';
import getAttack from '../getters/get_attack';
import { IConnect, IPlayer, TAttack } from '../interfaces';
import isKill from '../attack/is_kill';
import killShip from '../attack/kill_ship';
import finish from '../../modules/command_types/finish';
import { dataBase } from '../../data_base/db';

interface IListItem {
  x: number;
  y: number;
  value: TAttack;
}

function getList(grid: number[][]): IListItem[] {
  const list = [] as IListItem[];
  for (let x = 0; x < grid.length; x += 1) {
    const row = grid[x] as number[];
    for (let y = 0; y < row.length; y += 1) {
      if ((row[y] as number) < 2) {
        const value: TAttack = row[y] ? 'shot' : 'miss';
        list.push({ x, y, value });
      }
    }
  }
  return list;
}

export default function botMove(curPlayer: IPlayer): boolean {
  const connect = dataBase.connections.get(curPlayer.index) as IConnect;
  const ws = connect.socket;
  const grid = curPlayer.shipsGrid;
  let list = getList(grid);

  let result: IListItem;
  do {
    const attack = Math.floor(Math.random() * list.length);
    result = list[attack] as IListItem;
    list.splice(attack, 1);
    let tmpType = result.value;
    (grid[result.x] as number[])[result.y] = result.value === 'shot' ? 3 : 2;
    if (result.value === 'shot') {
      tmpType = isKill(grid, result.x, result.y) ? 'killed' : 'shot';
    }
    const curAttack = getAttack(result.x, result.y, 0, tmpType);
    ws.send(JSON.stringify(getResponse('attack', curAttack)));
    if (tmpType === 'killed') {
      killShip(null, ws, result.x, result.y, grid, 0);
      curPlayer.shipsCount -= 1;
      if (!curPlayer.shipsCount) {
        finish(connect, 0);
        return true;
      }
      list = getList(grid);
    }
  } while (result.value !== 'miss');
  return false;
}
