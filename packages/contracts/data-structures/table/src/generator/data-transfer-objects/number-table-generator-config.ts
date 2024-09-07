import {
  InvalidArgumentError,
  InvalidOperationError,
} from '@algorithm-visualizer/error-handling-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

type ValueSequenceAlignment = 'Asc' | 'Desc' | 'Random';

export interface INumberTableGeneratorConfigArgs {
  rowAmountRange: IntegerRange;
  columnAmountRange: IntegerRange;
  numberRange: IntegerRange;
  generateValueSequence?: boolean;
  valueSequenceAlignment?: ValueSequenceAlignment;
}

/**
 * Configuration object to pass to a {@link NumberTableGenerator}
 *
 * @throws InvalidOperationError
 * @throws InvalidArgumentError
 */
export class NumberTableGeneratorConfig {
  private _rowAmountRange: IntegerRange;
  private _columnAmountRange: IntegerRange;
  private _numberRange: IntegerRange;
  private _generateValueSequence: boolean;
  private _valueSequenceAlignment: ValueSequenceAlignment;

  constructor(args: INumberTableGeneratorConfigArgs) {
    this._validate(args);
    this._rowAmountRange = args.rowAmountRange;
    this._columnAmountRange = args.columnAmountRange;
    this._numberRange = args.numberRange;
    this._generateValueSequence = args.generateValueSequence ?? false;
    this._valueSequenceAlignment = args.valueSequenceAlignment ?? 'Random';
  }

  get rowAmountRange() {
    return this._rowAmountRange;
  }

  get columnAmountRange() {
    return this._columnAmountRange;
  }

  get numberRange() {
    return this._numberRange;
  }

  get generateValueSequence() {
    return this._generateValueSequence;
  }

  get valueSequenceAlignment() {
    return this._valueSequenceAlignment;
  }

  set rowAmountRange(input: IntegerRange) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property rowAmountRange is forbidden',
    });
  }

  set columnAmountRange(input: IntegerRange) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property columnAmountRange is forbidden',
    });
  }

  set numberRange(input: IntegerRange) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property numberRange is forbidden',
    });
  }

  set generateValueSequence(input: boolean) {
    throw new InvalidOperationError({
      message:
        'Writing to readonly property generateValueSequence is forbidden',
    });
  }

  set valueSequenceAlignment(input: ValueSequenceAlignment) {
    throw new InvalidOperationError({
      message:
        'Writing to readonly property valueSequenceAlignment is forbidden',
    });
  }

  private _validate(args: INumberTableGeneratorConfigArgs) {
    if (
      !['Asc', 'Desc', 'Random', undefined].includes(
        args.valueSequenceAlignment,
      )
    ) {
      throw new InvalidArgumentError({
        message:
          'Argument valueSequenceAlignment is neither "Asc", "Desc", "Random" or undefined',
        args: [args.valueSequenceAlignment],
      });
    }

    if (!['boolean', 'undefined'].includes(typeof args.generateValueSequence)) {
      throw new InvalidArgumentError({
        message: 'Argument generateValueSequence is not a boolean',
        args: [args.generateValueSequence],
      });
    }

    if (args.rowAmountRange.min < 1) {
      throw new InvalidArgumentError({
        message: 'Argument rowAmountRange.min is below one',
        args: [args.rowAmountRange.min],
      });
    }

    if (args.columnAmountRange.min < 1) {
      throw new InvalidArgumentError({
        message: 'Argument columnAmountRange.min is below one',
        args: [args.columnAmountRange.min],
      });
    }

    const { min, max } = args.numberRange;
    const valueRangeLength = max - min + 1;
    const maxTableCellAmount =
      args.rowAmountRange.max * args.columnAmountRange.max;
    const canRangeAmountFillValueSequence =
      valueRangeLength >= maxTableCellAmount;

    if (args.generateValueSequence && !canRangeAmountFillValueSequence) {
      throw new InvalidArgumentError({
        message: `Argument numberRange is not big enough to fill the maximum possible cell amount of ${maxTableCellAmount} based on the arguments rowAmountRange and columnAmountRange`,
        args: [args.numberRange],
      });
    }
  }
}
