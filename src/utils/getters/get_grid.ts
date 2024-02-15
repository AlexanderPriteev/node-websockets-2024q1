import { IShip } from '../interfaces';

export default function getGrid(ships: IShip[]) {
  const list: number[][] = new Array(10)
    .fill(null)
    .map(() => new Array(10).fill(0));
  const add = (ship: IShip) => {
    const { position, length, direction } = ship;
    const { x, y } = position;
    for (let i = 0; i < length; i += 1) {
      const newX = x + (!direction ? i : 0);
      const newY = y + (direction ? i : 0);
      const row = list[newX] as number[];
      row[newY] = 1;
    }
  };
  ships.forEach(add);
  return list;
}
