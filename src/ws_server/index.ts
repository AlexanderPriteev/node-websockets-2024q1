import { WebSocketServer } from 'ws';
import { WS_PORT } from '../utils/const';

export const wss = new WebSocketServer({ port: WS_PORT });
