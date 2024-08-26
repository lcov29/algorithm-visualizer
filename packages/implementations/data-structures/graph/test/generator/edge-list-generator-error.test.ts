import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { EdgeListGeneratorError } from '../../src/generator/edge-list-generator-error';

describe('EdgeListGeneratorError', () => {
  const cause = new RangeError('This caused the edge generator error');
  const config = new GraphGeneratorConfig({
    nodeAmount: new IntegerRange({ min: 2, max: 3 }),
    edgeAmountPerNode: new IntegerRange({ min: 3, max: 4 }),
    edgeWeight: new IntegerRange({ min: 3, max: 4 }),
    edgeDirection: 'unidirectional',
    allowRecursiveEdges: true,
  });
  const nodes = [{ id: 1, label: 'test', availableEdgePointAmount: 5 }];
  const error = new EdgeListGeneratorError({
    message: 'Edge list generator error',
    config,
    nodes,
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['message', 'Edge list generator error'],
    ['config', config],
    ['nodes', nodes],
    ['cause', cause],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(error[methodName]).toBe(expectedResult);
    });
  });
});
