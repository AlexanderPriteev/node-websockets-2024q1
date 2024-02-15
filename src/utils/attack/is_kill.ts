export default function isKill(
  grid: number[][],
  x: number,
  y: number,
): boolean {
  const cells = new Array(8).fill(0);
  if (x > 0 && y > 0) cells[0] = (grid[x - 1] as number[])[y - 1];
  if (x > 0) cells[1] = (grid[x - 1] as number[])[y];
  if (x > 0 && y < 9) cells[2] = (grid[x - 1] as number[])[y + 1];

  if (y > 0) cells[3] = (grid[x] as number[])[y - 1];
  if (y < 9) cells[4] = (grid[x] as number[])[y + 1];

  if (x < 9 && y > 0) cells[5] = (grid[x + 1] as number[])[y - 1];
  if (x < 9) cells[6] = (grid[x + 1] as number[])[y];
  if (x < 9 && y < 9) cells[7] = (grid[x + 1] as number[])[y + 1];

  return !cells.includes(1);
}
