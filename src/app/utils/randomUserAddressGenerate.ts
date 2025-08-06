export const generateRandomAddress = (): string => {
  const chars = 'abcdef0123456789';
  return (
    '0x' +
    Array.from({ length: 40 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  );
};
