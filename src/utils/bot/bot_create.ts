import { IPlayer } from '../interfaces';
import botShips from './bot_ships';

export default function createBot(): IPlayer {
  const ships = botShips();
  return {
    index: 0,
    name: 'BOT',
    ships: ships.ships,
    shipsGrid: ships.grid,
    shipsCount: ships.ships.length,
  };
}
