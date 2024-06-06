export type RandomIntegerGenerator = (min: number, max: number) => number;

/**
 * Generates a random integer within the specified range.
 *
 * @param {number} min Lower range boundary (inclusive).
 * @param {number} max Upper range boundary (inclusive), greater or equal to {@link min}.
 * @returns {number} Random integer between {@link min} and {@link max} (inclusive).
 */
export function getRandomIntegerBetween(min: number, max: number) {
  if (min > max) {
    throw new RangeError('The argument min is greater than the argument max');
  }
  return Math.floor(min + (max - min + 1) * Math.random());
}
