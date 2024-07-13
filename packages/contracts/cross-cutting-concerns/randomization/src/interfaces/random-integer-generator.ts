/**
 * Generates a random integer within the specified range.
 *
 * @param {number} min Lower range boundary (inclusive).
 * @param {number} max Upper range boundary (inclusive), greater or equal to {@link min}.
 *
 * @returns {number} Random integer between {@link min} and {@link max} (inclusive).
 *
 * @throws InvalidArgumentError
 */
export type IRandomIntegerGenerator = (min: number, max: number) => number;
