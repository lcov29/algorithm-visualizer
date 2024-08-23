import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelChangedEvent } from '../../../src';

describe('NodeLabelChangedEvent', () => {
  const nodeLabelChangedEvent = new NodeLabelChangedEvent({
    nodeId: 3,
    label: 'new',
  });

  describe('getters', () => {
    it.each([
      ['nodeId', 3],
      ['label', 'new'],
    ])('%s() returns specified value', (methodName, expectedValue) => {
      // @ts-expect-error reference to a method by its string name
      expect(nodeLabelChangedEvent[methodName]).toBe(expectedValue);
    });
  });

  describe('setters', () => {
    it.each([
      ['nodeId', 4],
      ['label', 'test'],
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
