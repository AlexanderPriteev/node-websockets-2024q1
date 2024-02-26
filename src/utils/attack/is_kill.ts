export default function isKill(
  grid: number[][],
  x: number,
  y: number,
): boolean {
  for (let i = x - 1; i >= 0; i -= 1) {
    const val = (grid[i] as number[])[y] as number;
    if (val === 1) return false;
    if ([0, 2, 4].includes(val)) break;
  }

  for (let i = x + 1; i <= 9; i += 1) {
    const val = (grid[i] as number[])[y] as number;
    if (val === 1) return false;
    if ([0, 2, 4].includes(val)) break;
  }

  for (let i = y - 1; i >= 0; i -= 1) {
    const val = (grid[x] as number[])[i] as number;
    if (val === 1) return false;
    if ([0, 2, 4].includes(val)) break;
  }

  for (let i = y + 1; i <= 9; i += 1) {
    const val = (grid[x] as number[])[i] as number;
    if (val === 1) return false;
    if ([0, 2, 4].includes(val)) break;
  }

  return true;
}
