export function avatarUrl(seed: string | number) {
  const n = (Number(seed) % 70) + 1;
  return `https://i.pravatar.cc/80?img=${n}`;
}
