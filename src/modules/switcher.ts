import { INVALID_INPUT } from '../utils/const';
import signup from './command_types/signup';
import { WebSocket } from 'ws';

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
      default:
        console.log(INVALID_INPUT);
    }
  } catch {
    console.log(INVALID_INPUT);
  }
}
