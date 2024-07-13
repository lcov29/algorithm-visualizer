import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelChangedEvent } from '../../src/events/node-label-changed-event';

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

  // describe.each([
  //   [
  //     'nodeId',
  //     nodeLabelChangedEvent.nodeId,
  //     3,
  //     // @ts-expect-error 'nodeId' is a read-only-property
  //     () => (nodeLabelChangedEvent.nodeId = 3),
  //   ],
  //   [
  //     'label',
  //     nodeLabelChangedEvent.label,
  //     'new',
  //     // @ts-expect-error 'currentLabel' is a read-only-property
  //     () => (nodeLabelChangedEvent.label = 'modified'),
  //   ],
  // ])('%s()', (methodName, returnValue, expectedReturnValue, tryWriteAccess) => {
  //   it(`returns specified ${methodName}`, () => {
  //     expect(returnValue).toEqual(expectedReturnValue);
  //   });

  //   it('is read only', () => {
  //     expect(() => {
  //       tryWriteAccess();
  //     }).toThrow();
  //   });
  // });
});
