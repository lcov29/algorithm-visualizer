import {
  InvalidArgumentError,
  InvalidOperationError,
} from '@algorithm-visualizer/error-handling-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { NumberTableGeneratorConfig } from '../../../src';
import { INumberTableGeneratorConfigArgs } from '../../../src/generator/data-transfer-objects/number-table-generator-config';

function buildMockArgs(
  args: Partial<INumberTableGeneratorConfigArgs> = {},
): INumberTableGeneratorConfigArgs {
  return {
    rowAmountRange: new IntegerRange({ min: 1, max: 2 }),
    columnAmountRange: new IntegerRange({ min: 3, max: 4 }),
    numberRange: new IntegerRange({ min: 2, max: 10 }),
    generateValueSequence: false,
    valueSequenceAlignment: 'Asc',
    ...args,
  };
}

describe('NumberTableGeneratorConfig', () => {
  let config: NumberTableGeneratorConfig;
  const configArgs = buildMockArgs();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('validation', () => {
    it('accepts valid input', () => {
      expect(
        () => new NumberTableGeneratorConfig(buildMockArgs()),
      ).not.toThrow();
    });

    describe.each([
      [
        'valueSequenceAlignment is not a valid alignment option',
        { valueSequenceAlignment: 'nonDefinedAlignmentOption' },
        'Argument valueSequenceAlignment is neither "Asc", "Desc", "Random" or undefined',
        ['nonDefinedAlignmentOption'],
      ],
      [
        'generateValueSequence is not a boolean',
        { generateValueSequence: 123 },
        'Argument generateValueSequence is not a boolean',
        ['123'],
      ],
      [
        'rowAmountRange has a min value below one',
        { rowAmountRange: new IntegerRange({ min: 0, max: 3 }) },
        'Argument rowAmountRange.min is below one',
        ['0'],
      ],
      [
        'columnAmountRange has a min value below one',
        { columnAmountRange: new IntegerRange({ min: 0, max: 3 }) },
        'Argument columnAmountRange.min is below one',
        ['0'],
      ],
      [
        'numberRange is not big enough to fill the maximum value sequence based on the maximum possible range and column amounts',
        {
          rowAmountRange: new IntegerRange({ min: 1, max: 3 }),
          columnAmountRange: new IntegerRange({ min: 1, max: 3 }),
          numberRange: new IntegerRange({ min: 0, max: 7 }),
          generateValueSequence: true,
        },
        'Argument numberRange is not big enough to fill the maximum possible cell amount of 9 based on the arguments rowAmountRange and columnAmountRange',
        ['{ min: 0, max: 7}'],
      ],
    ])(
      'when property %s',
      (_, mockArgs, expectedErrorMessage, expectedErrorArgs) => {
        it('throws an invalid argument error', () => {
          expect(
            // @ts-expect-error invalid config values
            () => new NumberTableGeneratorConfig(buildMockArgs(mockArgs)),
          ).toThrow(
            new InvalidArgumentError({
              message: expectedErrorMessage,
              args: expectedErrorArgs,
            }),
          );
        });
      },
    );

    describe.each([
      ['rowAmountRange', configArgs.rowAmountRange],
      ['columnAmountRange', configArgs.columnAmountRange],
      ['numberRange', configArgs.numberRange],
      ['generateValueSequence', configArgs.generateValueSequence],
      ['valueSequenceAlignment', configArgs.valueSequenceAlignment],
    ])('%s()', (methodName, expectedResult) => {
      beforeEach(() => {
        config = new NumberTableGeneratorConfig(configArgs);
      });

      it(`getter returns the specified ${methodName} value`, () => {
        // @ts-expect-error invoke method by string name
        expect(config[methodName]).toBe(expectedResult);
      });

      it('setter throws an invalid operation error', () => {
        // @ts-expect-error invoke method by string name
        expect(() => (config[methodName] = expectedResult)).toThrow(
          new InvalidOperationError({
            message: `Writing to readonly property ${methodName} is forbidden`,
          }),
        );
      });
    });
  });
});
