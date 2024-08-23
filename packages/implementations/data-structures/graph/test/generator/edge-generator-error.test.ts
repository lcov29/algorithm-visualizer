import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { IEdgeNode } from '../../src/generator/edge-generator';
import { EdgeGeneratorError } from '../../src/generator/edge-generator-error';

describe('EdgeGeneratorError', () => {
  let error: EdgeGeneratorError;
  let cause: RangeError;
  let config: GraphGeneratorConfig;
  let nodes: IEdgeNode[];

  beforeEach(() => {
    jest.resetAllMocks();
    cause = new RangeError('This caused the edge generator error');
    config = new GraphGeneratorConfig({
      nodeAmount: new IntegerRange({ min: 2, max: 3 }),
      edgeAmountPerNode: new IntegerRange({ min: 3, max: 4 }),
      edgeWeight: new IntegerRange({ min: 3, max: 4 }),
      edgeDirection: 'unidirectional',
      allowRecursiveEdges: true,
    });
    nodes = [{ id: 1, label: 'test', availableEdgePointAmount: 5 }];
    error = new EdgeGeneratorError({
      message: 'edge generator error',
      config,
      nodes,
      cause,
    });
  });

  it('returns the specified error message', () => {
    expect(error.message).toBe('edge generator error');
  });

  it('returns the specified config', () => {
    expect(error.config).toEqual(config);
  });

  it('returns the specified edge list', () => {
    expect(error.nodes).toBe(nodes);
  });

  it('returns the specified error cause', () => {
    expect(error.cause).toBe(cause);
  });
});
