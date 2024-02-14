import {IConnect, IGame, IPlayer, IRoom} from "../../utils/interfaces";
import {dataBase} from "../../data_base/db";
import {WebSocket} from "ws";
import getResponse from "../../utils/getters/get_response";


export default function createGame(room: IRoom){
    const gameId = new Date().getTime();

    const newGame: IGame = {
        gameId,
        roomId: room.roomId,
        isStart: false,
        players: room.roomUsers.map(e => ({
            index: e.index,
            name: e.name,
            ships: []
        } as IPlayer))
    }
    dataBase.games.set(gameId, newGame);
    room.roomUsers.forEach(e => {
        const data = JSON.stringify({
            idGame: gameId,
            idPlayer: e.index
        });
        const ws: WebSocket = (dataBase.connections.get(e.index) as IConnect).socket;
        const res = JSON.stringify(getResponse('create_game', data));
        ws.send(res);
    })
}