export interface IIntegerRange {
  readonly min: number;
  readonly max: number;
}

export class IntegerRange implements IIntegerRange {
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

  private _validate(min: number, max: number) {
    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new TypeError('Arguments must be of types number');
    }

    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      throw new RangeError('Arguments must be integers');
    }

    if (min < 0 || max < 0) {
      throw new RangeError('Arguments must be positive numbers');
    }

    if (min > max) {
      throw new RangeError(
        'Argument min must be greater or equal to argument max',
      );
    }
  }
}
