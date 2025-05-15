export const formatId = (id: string) => {
  if (id.length <= 12) return id;
  return `${id.slice(0, 6)}...${id.slice(-4)}`;
};
export const formatScore = (score: number) =>
  score.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatPoints = (points: number) => points.toLocaleString();
