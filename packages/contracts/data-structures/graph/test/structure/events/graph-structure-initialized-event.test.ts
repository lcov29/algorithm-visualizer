import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphStructureInitializedEvent } from '../../../src';

describe('GraphStructureInitializedEvent', () => {
  const mockGraphStructureNodes = [{ id: 0 }, { id: 1 }, { id: 2 }];
  const mockGraphStructureEdges = [
    { id: 0, startNodeId: 1, endNodeId: 2 },
    { id: 1, startNodeId: 2, endNodeId: 3 },
  ];
  const nodeLabelChangedEvent = new GraphStructureInitializedEvent({
    nodes: mockGraphStructureNodes,
    edges: mockGraphStructureEdges,
  });

  describe.each([
    ['nodes', mockGraphStructureNodes],
    ['edges', mockGraphStructureEdges],
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
