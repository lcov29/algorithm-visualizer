export type RandomBooleanGenerator = (
  probabilityTrueInPercent: number,
) => boolean;

/**
 * Generates a random boolean.
 *
 * @param {number} probabilityTrueInPercent - Integer between 0 and 100
 */
export function getRandomBoolean(probabilityTrueInPercent: number) {
  if (probabilityTrueInPercent < 0) {
    throw new RangeError('Argument probabilityTrueInPercent is negative');
  }

  if (probabilityTrueInPercent > 100) {
    throw new RangeError(
      'Argument probabilityTrueInPercent is greater than 100',
    );
  }

  if (probabilityTrueInPercent === 0) {
    return false;
  }

  return Math.floor(101 * Math.random()) <= probabilityTrueInPercent;
}
