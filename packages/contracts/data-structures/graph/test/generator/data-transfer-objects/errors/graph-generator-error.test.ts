import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { GraphGeneratorConfig, GraphGeneratorError } from '../../../../src';

describe('GraphGeneratorError', () => {
  const cause = new RangeError('This caused the graph generator error');
  const config = new GraphGeneratorConfig({
    nodeAmount: new IntegerRange({ min: 2, max: 3 }),
    edgeAmountPerNode: new IntegerRange({ min: 3, max: 4 }),
    edgeWeight: new IntegerRange({ min: 3, max: 4 }),
    edgeDirection: 'unidirectional',
    allowRecursiveEdges: true,
  });
  const error = new GraphGeneratorError({
    message: 'Graph generator error',
    config,
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['message', 'Graph generator error'],
    ['config', config],
    ['cause', cause],
  ])('%s()', (methodName, expectedResult) => {
    it(`returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(error[methodName]).toEqual(expectedResult);
    });
  });
});
