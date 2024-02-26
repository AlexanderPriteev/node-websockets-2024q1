import { INVALID_INPUT } from '../utils/const';
import signup from './command_types/signup';
import { WebSocket } from 'ws';
import createRoom from './command_types/create_room';
import addUserToRoom from './command_types/add_user_to_room';
import addShips from './command_types/add_ships';
import attack from './command_types/attack';
import singlePlay from './command_types/single_play';

export default function controller(
  message: string,
  id: number,
  ws: WebSocket,
): void {
  try {
    const req = JSON.parse(message);
    switch (req.type) {
      case 'reg':
        signup(req.data, id, ws);
        break;
      case 'create_room':
        createRoom(id);
        break;
      case 'add_user_to_room':
        addUserToRoom(req.data, id);
        break;
      case 'add_ships':
        addShips(req.data);
        break;
      case 'attack':
        attack(ws, req.data);
        break;
      case 'randomAttack':
        attack(ws, req.data);
        break;
      case 'single_play':
        singlePlay(ws, id);
        break;
      default:
        console.log(INVALID_INPUT);
    }
  } catch {
    console.log(INVALID_INPUT);
  }
}
