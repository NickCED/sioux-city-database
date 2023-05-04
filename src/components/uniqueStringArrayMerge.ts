export const uniqueStringArrayMerge = (
  a: string[],
  b: string[],
  ...args: string[]
) => {
  const uniqueArray = new Set([...a, ...b, ...args]);

  return Array.from(uniqueArray);
};
