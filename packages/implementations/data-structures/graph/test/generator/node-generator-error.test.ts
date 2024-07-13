import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { NodeGeneratorError } from '../../src/generator/node-generator-error';

describe('NodeGeneratorError', () => {
  let error: NodeGeneratorError;
  let cause: RangeError;
  let config: GraphGeneratorConfig;

  beforeEach(() => {
    jest.resetAllMocks();
    cause = new RangeError('This caused the node generator error');
    config = new GraphGeneratorConfig({
      nodeAmount: new IntegerRange({ min: 2, max: 3 }),
      edgeAmountPerNode: new IntegerRange({ min: 3, max: 4 }),
      edgeWeight: new IntegerRange({ min: 3, max: 4 }),
      edgeDirection: 'unidirectional',
      allowRecursiveEdges: true,
    });
    error = new NodeGeneratorError({
      message: 'node generator error',
      config,
      cause,
    });
  });

  it('returns specified error message', () => {
    expect(error.message).toBe('node generator error');
  });

  it('returns specified config', () => {
    expect(error.config).toEqual(config);
  });

  it('returns specified error cause', () => {
    expect(error.cause).toBe(cause);
  });
});
