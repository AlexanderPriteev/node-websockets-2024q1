import getGrid from '../getters/get_grid';
import randomShipsList from "./get_ships";

export default function botShips() {
  const ships = randomShipsList();
  const grid = getGrid(ships);
  return { ships: ships, grid: grid };
}
