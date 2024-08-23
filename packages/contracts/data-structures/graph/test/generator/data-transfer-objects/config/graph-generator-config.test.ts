import {
  InvalidArgumentError,
  InvalidOperationError,
} from '@algorithm-visualizer/error-handling-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import {
  GraphGeneratorConfig,
  IGraphGeneratorConfigArgs,
} from '../../../../src/generator';

function buildMockArgs(
  args: Partial<IGraphGeneratorConfigArgs> = {},
): IGraphGeneratorConfigArgs {
  return {
    nodeAmount: new IntegerRange({ min: 2, max: 5 }),
    edgeAmountPerNode: new IntegerRange({ min: 3, max: 6 }),
    edgeWeight: new IntegerRange({ min: 2, max: 7 }),
    edgeDirection: 'unidirectional',
    allowRecursiveEdges: true,
    ...args,
  };
}

describe('GraphGeneratorConfig', () => {
  let config: GraphGeneratorConfig;
  const configArgs = buildMockArgs();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('validation', () => {
    it('accepts valid input', () => {
      expect(() => new GraphGeneratorConfig(buildMockArgs())).not.toThrow();
    });

    describe.each([
      [
        'edgeDirection is not a valid direction option',
        { edgeDirection: 'nonDefinedDirection' },
        'Argument edgeDirection is neither "unidirectional" nor "bidirectional"',
        ['nonDefinedDirection'],
      ],
      [
        'allowRecursiveEdges is not a boolean',
        { allowRecursiveEdges: 123 },
        'Argument allowRecursiveEdges is not a boolean',
        ['123'],
      ],
      [
        'edgeAmountPerNode has a min value below one',
        { edgeAmountPerNode: new IntegerRange({ min: 0, max: 3 }) },
        'Argument edgeAmountPerNode.min is below one',
        ['0'],
      ],
      [
        'nodeAmount has a min value below two',
        { nodeAmount: new IntegerRange({ min: 1, max: 3 }) },
        'Argument nodeAmount.min is below two',
        ['1'],
      ],
    ])(
      'when property %s',
      (_, mockArgs, expectedErrorMessage, expectedErrorArgs) => {
        it('throws an invalid argument error', () => {
          expect(
            // @ts-expect-error invalid config values
            () => new GraphGeneratorConfig(buildMockArgs(mockArgs)),
          ).toThrow(
            new InvalidArgumentError({
              message: expectedErrorMessage,
              args: expectedErrorArgs,
            }),
          );
        });
      },
    );
  });

  describe.each([
    ['nodeAmount', configArgs.nodeAmount],
    ['edgeAmountPerNode', configArgs.edgeAmountPerNode],
    ['edgeWeight', configArgs.edgeWeight],
    ['edgeDirection', configArgs.edgeDirection],
    ['allowRecursiveEdges', configArgs.allowRecursiveEdges],
  ])('%s()', (methodName, expectedResult) => {
    beforeEach(() => {
      config = new GraphGeneratorConfig(configArgs);
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
