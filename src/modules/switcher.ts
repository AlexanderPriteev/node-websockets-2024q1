import { INVALID_INPUT } from '../utils/const';
import signup from './command_types/signup';
import { WebSocket } from 'ws';
import createRoom from './command_types/create_room';
import addUserToRoom from './command_types/add_user_to_room';

export default function switcher(
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
      default:
        console.log(INVALID_INPUT);
    }
  } catch {
    console.log(INVALID_INPUT);
  }
}
