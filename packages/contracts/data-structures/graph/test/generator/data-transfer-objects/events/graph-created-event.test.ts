import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphCreatedEvent, IEdgeList, INodeList } from '../../../../src';

describe('GraphCreatedEvent', () => {
  const mockNodeList = 'mockNodeList' as unknown as INodeList;
  const mockEdgeList = 'mockEdgeList' as unknown as IEdgeList;
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
