import {
  InvalidArgumentError,
  InvalidOperationError,
} from '../../../cross-cutting-concerns/error-handling';

/**
 * A data structure representing the inclusive range between two integers.
 *
 * @throws InvalidOperationError
 * @throws InvalidArgumentError
 */
export class IntegerRange {
  private _min: number;
  private _max: number;

  constructor(args: { min: number; max: number }) {
    const { min, max } = args;
    this._validate(min, max);
    this._min = min;
    this._max = max;
  }

  get min() {
    return this._min;
  }

  get max() {
    return this._max;
  }

  set min(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property min is forbidden',
    });
  }

  set max(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property max is forbidden',
    });
  }

  private _validate(min: number, max: number) {
    if (!Number.isInteger(min)) {
      throw new InvalidArgumentError({
        message: 'Argument min is not an integer',
        args: [min],
      });
    }

    if (!Number.isInteger(max)) {
      throw new InvalidArgumentError({
        message: 'Argument max is not an integer',
        args: [max],
      });
    }

    if (min > max) {
      throw new InvalidArgumentError({
        message: 'Argument min is greater than argument max',
        args: [min, max],
      });
    }
  }
}
