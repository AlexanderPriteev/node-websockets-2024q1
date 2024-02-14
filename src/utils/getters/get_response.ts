import { IResult } from '../interfaces';

export default function getResponse(type: string, data: string = ''): IResult {
  return {
    type: type,
    data: data,
    id: 0,
  };
}
