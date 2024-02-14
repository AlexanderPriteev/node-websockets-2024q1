import { IUser } from '../interfaces';

export default function getUser(name: string, id: number): IUser {
  return {
    name: name,
    index: id,
    error: false,
    errorText: '',
  };
}
