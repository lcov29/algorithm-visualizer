import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphViewInitializedEvent, IEdge, INode } from '../../../../src';

describe('GraphViewInitializedEvent', () => {
  const mockNodes: INode[] = [
    { id: 0, label: 'A' },
    { id: 1, label: 'B' },
    { id: 2, label: 'C' },
  ];
  const mockEdges: IEdge[] = [
    { id: 0, startNodeId: 0, endNodeId: 1 },
    { id: 1, startNodeId: 1, endNodeId: 2 },
  ];

  const graphViewInitializedEvent = new GraphViewInitializedEvent({
    nodes: mockNodes,
    edges: mockEdges,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['nodes', mockNodes],
    ['edges', mockEdges],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(graphViewInitializedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        // @ts-expect-error invoke method by string name
        graphViewInitializedEvent[methodName] = expectedResult;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
