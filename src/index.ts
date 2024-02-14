import { httpServer } from './http_server';
import { WebSocketServer } from 'ws';
import switcher from './modules/switcher';
import * as console from 'console';
import logout from './modules/command_types/logout';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const wss = new WebSocketServer({ port: WS_PORT });
wss.on('connection', function connection(ws) {
  const id = new Date().getTime();
  ws.on('error', console.error);

  ws.on('message', function message(data: string) {
    console.log(JSON.parse(data));
    const res = JSON.stringify(JSON.parse(data));
    switcher(res, id, ws);
    // if (result === INVALID_INPUT) {
    //   console.log(INVALID_INPUT);
    // } else {
    //   ws.send(result);
    // }
  });

  ws.on('close', function close() {
    logout(id);
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
