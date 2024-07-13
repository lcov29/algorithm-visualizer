import {
  InvalidArgumentError,
  InvalidOperationError,
} from '@algorithm-visualizer/error-handling-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import {
  GraphGeneratorConfig,
  IGraphGeneratorConfigArgs,
} from '../../src/other/graph-generator-config';

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

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('validation', () => {
    it('throws an invalid argument error when property edgeDirection is not a valid direction option', () => {
      expect(
        () =>
          new GraphGeneratorConfig(
            // @ts-expect-error edgeDirection is not of type number
            buildMockArgs({ edgeDirection: 'nonDefinedDirection' }),
          ),
      ).toThrow(
        new InvalidArgumentError({
          message:
            'Argument edgeDirection is neither "unidirectional" nor "bidirectional"',
          args: ['nonDefinedDirection'],
        }),
      );
    });

    it('throws an invalid argument error when property allowRecursiveEdges is not a boolean', () => {
      expect(
        () =>
          // @ts-expect-error edgeDirection is not of type number
          new GraphGeneratorConfig(buildMockArgs({ allowRecursiveEdges: 123 })),
      ).toThrow(
        new InvalidArgumentError({
          message: 'Argument allowRecursiveEdges is not a boolean',
          args: [123],
        }),
      );
    });

    it('throws an invalid argument error when property edgeAmountPerNode has a min value below one', () => {
      expect(() => {
        const range = new IntegerRange({ min: 0, max: 3 });
        new GraphGeneratorConfig(buildMockArgs({ edgeAmountPerNode: range }));
      }).toThrow(
        new InvalidArgumentError({
          message: 'Argument edgeAmountPerNode.min is below one',
          args: [0],
        }),
      );
    });

    it('throws an invalid argument error when property nodeAmount has a min value below two', () => {
      expect(() => {
        const range = new IntegerRange({ min: 1, max: 3 });
        new GraphGeneratorConfig(buildMockArgs({ nodeAmount: range }));
      }).toThrow(
        new InvalidArgumentError({
          message: 'Argument nodeAmount.min is below two',
          args: [1],
        }),
      );
    });
  });

  describe('getters', () => {
    const configArgs = buildMockArgs();

    beforeEach(() => {
      config = new GraphGeneratorConfig(configArgs);
    });

    it.each([
      ['nodeAmount', configArgs.nodeAmount],
      ['edgeAmountPerNode', configArgs.edgeAmountPerNode],
      ['edgeWeight', configArgs.edgeWeight],
      ['edgeDirection', configArgs.edgeDirection],
      ['allowRecursiveEdges', configArgs.allowRecursiveEdges],
    ])('%s() returns specified value', (methodName, expectedValue) => {
      // @ts-expect-error reference to a method by its string name
      expect(config[methodName]).toEqual(expectedValue);
    });
  });

  describe('setters', () => {
    const configArgs = buildMockArgs();

    beforeEach(() => {
      config = new GraphGeneratorConfig(configArgs);
    });

    it.each([
      ['nodeAmount', configArgs.nodeAmount],
      ['edgeAmountPerNode', configArgs.edgeAmountPerNode],
      ['edgeWeight', configArgs.edgeWeight],
      ['edgeDirection', configArgs.edgeDirection],
      ['allowRecursiveEdges', configArgs.allowRecursiveEdges],
    ])(
      'throws an invalid operation error when trying to write to the %s property',
      (methodName, writeValue) => {
        // @ts-expect-error reference to a method by its string name
        expect(() => (config[methodName] = writeValue)).toThrow(
          new InvalidOperationError({
            message: `Writing to readonly property ${methodName} is forbidden`,
          }),
        );
      },
    );
  });
});
