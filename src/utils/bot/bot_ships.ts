import { BOT_FIELDS } from './bot_fields';
import { IShip } from '../interfaces';
import getGrid from '../getters/get_grid';

export default function botShips() {
  const ships = JSON.parse(
    BOT_FIELDS[Math.floor(Math.random() * BOT_FIELDS.length)] as string,
  ) as IShip[];
  const grid = getGrid(ships);
  return { ships: ships, grid: grid };
}
