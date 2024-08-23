/**
 * Generates a random boolean.
 *
 * @param {number} probabilityTrueInPercent - Integer between 0 and 100
 *
 * @throws InvalidArgumentError
 */
export type RandomBooleanGenerator = (
  probabilityTrueInPercent: number,
) => boolean;
