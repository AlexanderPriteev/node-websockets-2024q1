import { httpServer } from './http_server';
import { wss } from './ws_server';
import controller from './modules/controller';
import logout from './modules/command_types/logout';
import { HTTP_PORT } from './utils/const';

wss.on('connection', function connection(ws) {
  const id = new Date().getTime();
  ws.on('error', console.error);

  ws.on('message', function message(data: string) {
    console.log(JSON.parse(data));
    const res = JSON.stringify(JSON.parse(data));
    controller(res, id, ws);
  });

  ws.on('close', function close() {
    logout(id);
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
