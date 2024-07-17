import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { GraphGeneratorError } from '../../src/errors/graph-generator-error';

describe('GraphGeneratorError', () => {
  let error: GraphGeneratorError;
  let cause: RangeError;
  let config: GraphGeneratorConfig;

  beforeEach(() => {
    jest.resetAllMocks();
    cause = new RangeError('This caused the graph generator error');
    config = new GraphGeneratorConfig({
      nodeAmount: new IntegerRange({ min: 2, max: 3 }),
      edgeAmountPerNode: new IntegerRange({ min: 3, max: 4 }),
      edgeWeight: new IntegerRange({ min: 3, max: 4 }),
      edgeDirection: 'unidirectional',
      allowRecursiveEdges: true,
    });
    error = new GraphGeneratorError({
      message: 'graph generator error',
      config,
      cause,
    });
  });

  it('returns the specified error message', () => {
    expect(error.message).toBe('graph generator error');
  });

  it('returns the specified config', () => {
    expect(error.config).toEqual(config);
  });

  it('returns the specified error cause', () => {
    expect(error.cause).toBe(cause);
  });
});
