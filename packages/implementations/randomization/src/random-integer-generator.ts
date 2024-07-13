import { IIntegerValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';

interface getRandomIntegerBetweenArgs {
  min: number;
  max: number;
  validator: IIntegerValidator;
}

export const getRandomIntegerBetween = (args: getRandomIntegerBetweenArgs) => {
  const { min, max, validator } = args;

  if (!validator.isValidInteger(min)) {
    throw new InvalidArgumentError({
      message: 'Argument min is not an integer',
      args: [min],
    });
  }

  if (!validator.isValidInteger(max)) {
    throw new InvalidArgumentError({
      message: 'Argument max is not an integer',
      args: [max],
    });
  }

  if (min > max) {
    throw new InvalidArgumentError({
      message: 'Argument min is greater than the argument max',
      args: [min, max],
    });
  }

  return Math.floor(min + (max - min + 1) * Math.random());
};
