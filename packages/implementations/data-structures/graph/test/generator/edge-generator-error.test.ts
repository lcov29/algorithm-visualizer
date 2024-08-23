import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { EdgeGeneratorError } from '../../src/generator/edge-generator-error';

describe('EdgeGeneratorError', () => {
  const cause = new RangeError('This caused the edge generator error');
  const config = new GraphGeneratorConfig({
    nodeAmount: new IntegerRange({ min: 2, max: 3 }),
    edgeAmountPerNode: new IntegerRange({ min: 3, max: 4 }),
    edgeWeight: new IntegerRange({ min: 3, max: 4 }),
    edgeDirection: 'unidirectional',
    allowRecursiveEdges: true,
  });
  const nodes = [{ id: 1, label: 'test', availableEdgePointAmount: 5 }];
  const error = new EdgeGeneratorError({
    message: 'Edge generator error',
    config,
    nodes,
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['message', 'Edge generator error'],
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
