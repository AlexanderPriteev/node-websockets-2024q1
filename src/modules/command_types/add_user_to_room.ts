import getUserByID from '../../utils/getters/get_user_by_ID';
import { dataBase } from '../../data_base/db';
import { IRoom } from '../../utils/interfaces';
import updateRoom from './update_room';

export default function addUserToRoom(data: string, id: number) {
  const { indexRoom } = JSON.parse(data);
  const { name, index } = getUserByID(id);
  const room = dataBase.rooms.get(indexRoom) as IRoom;
  const isInRoom = !room.roomUsers.some((e) => e.index === id);
  if (room.payersCount < 2 && isInRoom) {
    room.payersCount += 1;
    room.roomUsers.push({ name, index });
    updateRoom();
  }
}
