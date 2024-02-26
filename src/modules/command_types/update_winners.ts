import { WebSocket } from 'ws';
import { dataBase } from '../../data_base/db';
import getResponse from '../../utils/getters/get_response';
import { wss } from '../../ws_server';

export default function updateWinners(ws?: WebSocket) {
  const winners = Array.from(dataBase.winners.values()).sort(
    (a, b) => b.wins - a.wins,
  );
  const result = getResponse('update_winners', JSON.stringify(winners));
  if (ws) {
    ws.send(JSON.stringify(result));
  } else {
    wss.clients.forEach((client) => client.send(JSON.stringify(result)));
  }
}
