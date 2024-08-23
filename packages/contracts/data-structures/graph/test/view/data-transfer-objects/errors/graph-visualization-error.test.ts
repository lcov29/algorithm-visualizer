import { GraphVisualizationError } from '../../../../src';

describe('GraphVisualizationError', () => {
  const cause = new RangeError('This caused the graph visualization error');
  const error = new GraphVisualizationError({
    message: 'Graph visualization error',
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['message', 'Graph visualization error'],
    ['cause', cause],
  ])('%s()', (methodName, expectedResult) => {
    it(`returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(error[methodName]).toBe(expectedResult);
    });
  });
});
