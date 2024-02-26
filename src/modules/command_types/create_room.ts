import { dataBase } from '../../data_base/db';
import updateRoom from './update_room';
import getUserByID from '../../utils/getters/get_user_by_ID';

export default function createRoom(id: number) {
  const roomId = new Date().getTime();
  const user = getUserByID(id);

  user.room = roomId;

  dataBase.rooms.set(roomId, {
    roomId,
    roomUsers: [{ name: user.name, index: user.index }],
    isGame: false,
    payersCount: 1,
  });

  updateRoom();
}
