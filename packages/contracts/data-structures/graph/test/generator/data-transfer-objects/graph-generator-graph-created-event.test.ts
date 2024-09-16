import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  GraphGeneratorGraphGeneratedEvent,
  IGeneratedEdge,
  IGeneratedNode,
} from '../../../src';

describe('GraphGeneratorGraphGeneratedEvent', () => {
  const mockGeneratedNodes: IGeneratedNode[] = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
  ];

  const mockGeneratedEdges: IGeneratedEdge[] = [
    { id: 0, startNodeId: 1, endNodeId: 2 },
    { id: 1, startNodeId: 2, endNodeId: 3 },
  ];

  const graphGeneratedEvent = new GraphGeneratorGraphGeneratedEvent({
    nodes: mockGeneratedNodes,
    edges: mockGeneratedEdges,
  });

  describe.each([
    ['nodes', mockGeneratedNodes],
    ['edges', mockGeneratedEdges],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(graphGeneratedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (graphGeneratedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
