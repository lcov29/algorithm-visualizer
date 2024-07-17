import { GraphVisualizationError } from '../../src/errors/graph-visualization-error';

describe('GraphVisualizationError', () => {
  let error: GraphVisualizationError;
  let cause: RangeError;

  beforeEach(() => {
    jest.resetAllMocks();
    cause = new RangeError('This caused the graph visualization error');
    error = new GraphVisualizationError({
      message: 'graph visualization error',
      cause,
    });
  });

  it('returns the specified error message', () => {
    expect(error.message).toBe('graph visualization error');
  });

  it('returns the specified error cause', () => {
    expect(error.cause).toBe(cause);
  });
});
