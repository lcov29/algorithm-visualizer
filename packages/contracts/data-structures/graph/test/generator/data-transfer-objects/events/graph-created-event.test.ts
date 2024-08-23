import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphCreatedEvent, IEdgeList, INodeList } from '../../../../src';

describe('GraphCreatedEvent', () => {
  const mockNodeList = 'mockNodeList' as unknown as INodeList;
  const mockEdgeList = 'mockEdgeList' as unknown as IEdgeList;
  const nodeLabelChangedEvent = new GraphCreatedEvent({
    nodes: mockNodeList,
    edges: mockEdgeList,
  });

  describe('getters', () => {
    it.each([
      ['nodes', mockNodeList],
      ['edges', mockEdgeList],
    ])('%s() returns specified value', (methodName, expectedValue) => {
      // @ts-expect-error reference to a method by its string name
      expect(nodeLabelChangedEvent[methodName]).toBe(expectedValue);
    });
  });

  describe('setters', () => {
    it.each([
      ['nodes', mockNodeList],
      ['edges', mockEdgeList],
    ])(
      'throws an invalid operation error when trying to write to the %s property',
      (methodName, newValue) => {
        // @ts-expect-error reference to a method by its string name
        expect(() => (nodeLabelChangedEvent[methodName] = newValue)).toThrow(
          new InvalidOperationError({
            message: `Writing to readonly property ${methodName} is forbidden`,
          }),
        );
      },
    );
  });
});
