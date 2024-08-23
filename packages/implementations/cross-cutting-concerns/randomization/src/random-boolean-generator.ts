import { IIntegerValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';

interface IGetRandomBooleanArgs {
  validator: IIntegerValidator;
  probabilityTrueInPercent: number;
}

/**
 * Generates a random boolean.
 *
 * @param {number} probabilityTrueInPercent - Integer between 0 and 100
 *
 * @throws InvalidArgumentError
 */
export const getRandomBoolean = (args: IGetRandomBooleanArgs) => {
  const { validator, probabilityTrueInPercent } = args;

  if (!validator.isValidNonNegativeInteger(probabilityTrueInPercent)) {
    throw new InvalidArgumentError({
      message:
        'Argument probabilityTrueInPercent is not a non negative integer',
      args: [probabilityTrueInPercent],
    });
  }

  if (probabilityTrueInPercent > 100) {
    throw new InvalidArgumentError({
      message: 'Argument probabilityTrueInPercent is greater than 100',
      args: [probabilityTrueInPercent],
    });
  }

  if (probabilityTrueInPercent === 0) {
    return false;
  }

  return Math.floor(101 * Math.random()) <= probabilityTrueInPercent;
};
