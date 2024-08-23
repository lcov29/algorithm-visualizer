import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeTitleChangedEvent } from '../../src/events';

describe('NodeTitleChangedEvent', () => {
  const nodeTitleChangedEvent = new NodeTitleChangedEvent({
    nodeId: 3,
    title: 'foo',
  });

  describe('getters', () => {
    it.each([
      ['nodeId', 3],
      ['title', 'foo'],
    ])('%s() returns specified value', (methodName, expectedValue) => {
      // @ts-expect-error reference to a method by its string name
      expect(nodeTitleChangedEvent[methodName]).toBe(expectedValue);
    });
  });

  describe('setters', () => {
    it.each([
      ['nodeId', 4],
      ['title', 'test'],
    ])(
      'throws an invalid operation error when trying to write to the %s property',
      (methodName, newValue) => {
        // @ts-expect-error reference to a method by its string name
        expect(() => (nodeTitleChangedEvent[methodName] = newValue)).toThrow(
          new InvalidOperationError({
            message: `Writing to readonly property ${methodName} is forbidden`,
          }),
        );
      },
    );
  });
});
