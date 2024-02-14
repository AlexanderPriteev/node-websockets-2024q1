import { IResult } from '../utils/interfaces';
import { INVALID_INPUT } from '../utils/const';
import { dataBase } from './db';
import * as console from 'console';
import signup from './command_types/signup';

export default function switcher(message: string, id: number): string {
  try {
    const req = JSON.parse(message);
    const result: IResult = {
      type: req.type,
      data: '',
      id: 0,
    };
    switch (req.type) {
      case 'reg':
        result.data = signup(req.data, id);
        break;
      default:
        return INVALID_INPUT;
    }

    //TODO: удалить
    console.log(dataBase.users);

    return JSON.stringify(result);
  } catch {
    return INVALID_INPUT;
  }
}
