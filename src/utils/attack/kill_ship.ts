import { WebSocket } from 'ws';
import getResponse from '../getters/get_response';
import getAttack from '../getters/get_attack';

export default function killShip(
  player: WebSocket | null,
  enemy: WebSocket | null,
  x: number,
  y: number,
  grid: number[][],
  index: number,
) {
  function check(x: number, y: number) {
    const cell = (grid[x] as number[])[y] as number;

    if (cell > 3) return;
    const isNewCheck = cell === 3;
    (grid[x] as number[])[y] = 4;
    const type = cell === 3 ? 'killed' : 'miss';
    const res = getResponse('attack', getAttack(x, y, index, type));
    if (player) player.send(JSON.stringify(res));
    if (enemy) enemy.send(JSON.stringify(res));

    if (isNewCheck) {
      if (x > 0 && y > 0) check(x - 1, y - 1);
      if (x > 0) check(x - 1, y);
      if (x > 0 && y < 9) check(x - 1, y + 1);

      if (y > 0) check(x, y - 1);
      if (y < 9) check(x, y + 1);

      if (x < 9 && y > 0) check(x + 1, y - 1);
      if (x < 9) check(x + 1, y);
      if (x < 9 && y < 9) check(x + 1, y + 1);
    }
  }
  check(x, y);
}
