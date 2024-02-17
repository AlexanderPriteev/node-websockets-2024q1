import { TShip, IShip } from '../interfaces';

export default function randomShipsList(): IShip[] {
  const types: TShip[] = ['huge', 'large', 'medium', 'small'];
  const list = new Set(new Array(99).fill(0).map((_, i) => i));
  const ships: IShip[] = [];

  for (let i = 0; i < 4; i += 1) {
    const length = 4 - i;
    const max = 10 - length;
    for (let j = 0; j <= i; j += 1) {

      let [x, y] = [0, 0]
      let direction = false
      for(let i = true; i;){
          i = false;
          direction = !Math.round(Math.random());
          const tmpList = [...list].filter(
              (e) => !direction ? e % 10 <= max : Math.floor(e / 10) <= max,
          );
          const rand = Math.floor(Math.random() * tmpList.length);
          const position = tmpList[rand] as number;
          y = Math.floor(position / 10);
          x = position % 10;
          const ex = x + (!direction ? length : 1) - 1;
          const ey = y + (direction ? length : 1) - 1;
          if(!list.has(ey * 10 + ex)) i = true;
      }

      ships.push({
        position: { x, y },
        direction,
        length,
        type: types[i] as TShip,
      });

      const xStart = x - Number(x > 0);
      const yStart = y - Number(y > 0);
      let xEnd = (x + length) > 9 ? 9 : (x + length);
      let yEnd = (y + 1) > 9 ? 9 : (y + 1);
      if (direction) {
        xEnd = (x + 1) > 9 ? 9 : (x + 1);
        yEnd = (y + length) > 9 ? 9 : (y + length);
      }
      for (let n = xStart; n <= xEnd; n += 1) {
        for (let m = yStart; m <= yEnd; m += 1) {
          list.delete(m * 10 + n);
        }
      }
    }
  }
  return ships;
}
