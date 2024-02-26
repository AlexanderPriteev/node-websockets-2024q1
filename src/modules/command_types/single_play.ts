import { IGame, IPlayer } from '../../utils/interfaces';
import { dataBase } from '../../data_base/db';
import getResponse from '../../utils/getters/get_response';
import createBot from '../../utils/bot/bot_create';
import getUserByID from '../../utils/getters/get_user_by_ID';
import { WebSocket } from 'ws';
import updateRoom from './update_room';

export default function singlePlay(ws: WebSocket, id: number) {
  const gameId = new Date().getTime();
  const bot: IPlayer = createBot();
  const user = getUserByID(id);
  const player = {
    index: user.index,
    name: user.name,
    ships: [],
    shipsGrid: [],
    shipsCount: 0,
  } as IPlayer;

  const newGame: IGame = {
    gameId,
    roomId: 0,
    isStart: false,
    readyPlayers: 1,
    players: [bot, player],
  };
  dataBase.games.set(gameId, newGame);

  if (user.room) {
    dataBase.rooms.delete(user.room);
    user.room = 0;
    updateRoom();
  }

  user.game = gameId;
  const data = JSON.stringify({
    idGame: gameId,
    idPlayer: id,
  });
  const res = JSON.stringify(getResponse('create_game', data));
  ws.send(res);
}
