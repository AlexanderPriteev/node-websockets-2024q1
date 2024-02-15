import { IGame, IPlayer, IShipReq } from '../../utils/interfaces';
import { dataBase } from '../../data_base/db';
import startGame from './start_game';

export default function addShips(data: string) {
  const req = JSON.parse(data) as IShipReq;
  const game = dataBase.games.get(req.gameId) as IGame;
  const player = game.players.find(
    (e) => e.index === req.indexPlayer,
  ) as IPlayer;
  player.ships = req.ships;
  game.readyPlayers += 1;

  if (game.readyPlayers === 2) {
    const P1 = game.players[0] as IPlayer;
    const P2 = game.players[1] as IPlayer;
    const index = Math.round(Math.random()) ? P1.index : P2.index;
    startGame(P1, index);
    startGame(P2, index);
  }
}
