import { dataBase } from '../../data_base/db';
import updateRoom from './update_room';
import getUserByID from '../../utils/getters/get_user_by_ID';

export default function createRoom(id: number) {
  const roomID = new Date().getTime();
  const user = getUserByID(id);

  user.room = roomID;

  dataBase.rooms.set(roomID, {
    roomID,
    roomUsers: [{ name: user.name, index: user.index }],
    isGame: false,
    payersCount: 1,
  });

  updateRoom();
}
