import { IConnect, IGame, IPlayer, IRoom, IUser } from '../../utils/interfaces';
import { dataBase } from '../../data_base/db';
import getResponse from '../../utils/getters/get_response';
import updateRoom from './update_room';

export default function createGame(room: IRoom) {
  const gameId = new Date().getTime();

  const newGame: IGame = {
    gameId,
    roomId: room.roomId,
    isStart: false,
    readyPlayers: 0,
    players: room.roomUsers.map(
      (e) =>
        ({
          index: e.index,
          name: e.name,
          ships: [],
          shipsGrid: [],
          shipsCount: 0,
        }) as IPlayer,
    ),
  };
  dataBase.games.set(gameId, newGame);
  room.roomUsers.forEach((e) => {
    const data = JSON.stringify({
      idGame: gameId,
      idPlayer: e.index,
    });
    const ws = dataBase.connections.get(e.index) as IConnect;
    const player = dataBase.users.get(ws.name) as IUser;
    player.room = 0;
    player.game = gameId;
    const res = JSON.stringify(getResponse('create_game', data));
    ws.socket.send(res);
  });

  dataBase.rooms.delete(room.roomId);
  updateRoom();
}
