import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphCreatedEvent, IEdgeList, INodeList } from '../../../../src';

describe('GraphCreatedEvent', () => {
  const mockNodeList = {
    nodeIds: [0, 1, 2],
  } as INodeList;
  const mockEdgeList = {
    edges: [
      { id: 0, startNodeId: 1, endNodeId: 2 },
      { id: 1, startNodeId: 2, endNodeId: 3 },
    ],
  } as IEdgeList;
  const nodeLabelChangedEvent = new GraphCreatedEvent({
    nodes: mockNodeList,
    edges: mockEdgeList,
  });

  describe.each([
    ['nodes', mockNodeList],
    ['edges', mockEdgeList],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(nodeLabelChangedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (nodeLabelChangedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
