import { WebSocket } from 'ws';
import getResponse from '../../utils/getters/get_response';
import { dataBase } from '../../data_base/db';
import { wss } from '../../ws_server';

export default function updateRoom(ws?: WebSocket) {
  const rooms = [...dataBase.rooms.values()].map((e) => ({
    roomId: e.roomID,
    roomUsers: e.roomUsers,
  }));
  const result = getResponse('update_room', JSON.stringify(rooms));
  if (ws) {
    ws.send(JSON.stringify(result));
  } else {
    wss.clients.forEach((client) => client.send(JSON.stringify(result)));
  }
}
