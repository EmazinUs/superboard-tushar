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

export const formatNumberToK = (number: string): string => {
  const num = parseFloat(number);

  if (isNaN(num)) return '0';
  if (Math.abs(num) < 1000) return num.toString();

  const k = num / 1000;
  return k >= 1000 ? `${(k / 1000).toFixed(1)} M` : `${k.toFixed(1)} K`;
};
