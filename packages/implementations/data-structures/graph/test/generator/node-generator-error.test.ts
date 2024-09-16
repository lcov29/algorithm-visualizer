import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { NodeGeneratorError } from '../../src/generator/node-generator-error';

describe('NodeGeneratorError', () => {
  const cause = new RangeError('This caused the node generator error');
  const config = new GraphGeneratorConfig({
    nodeAmount: new IntegerRange({ min: 2, max: 3 }),
    edgeAmountPerNode: new IntegerRange({ min: 3, max: 4 }),
    edgeWeight: new IntegerRange({ min: 3, max: 4 }),
    edgeDirection: 'unidirectional',
    allowRecursiveEdges: true,
  });
  const error = new NodeGeneratorError({
    message: 'Node generator error',
    config,
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['message', 'Node generator error'],
    ['config', config],
    ['cause', cause],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(error[methodName]).toBe(expectedResult);
    });
  });
});
