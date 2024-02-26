import { IAttack, TAttack } from '../interfaces';

export default function getAttack(
  x: number,
  y: number,
  currentPlayer: number,
  status: TAttack,
) {
  const data: IAttack = {
    position: { x, y },
    currentPlayer,
    status,
  };
  return JSON.stringify(data);
}
