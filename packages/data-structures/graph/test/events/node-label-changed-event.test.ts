import { NodeLabelChangedEvent } from '../../src/events/node-label-changed-event';

describe('NodeLabelChangedEvent', () => {
  const nodeLabelChangedEvent = new NodeLabelChangedEvent({
    nodeId: 3,
    label: 'new',
  });

  describe.each([
    [
      'nodeId',
      nodeLabelChangedEvent.nodeId,
      3,
      // @ts-expect-error 'nodeId' is a read-only-property
      () => (nodeLabelChangedEvent.nodeId = 3),
    ],
    [
      'label',
      nodeLabelChangedEvent.label,
      'new',
      // @ts-expect-error 'currentLabel' is a read-only-property
      () => (nodeLabelChangedEvent.label = 'modified'),
    ],
  ])('%s()', (methodName, returnValue, expectedReturnValue, tryWriteAccess) => {
    it(`returns specified ${methodName}`, () => {
      expect(returnValue).toEqual(expectedReturnValue);
    });

    it('is read only', () => {
      expect(() => {
        tryWriteAccess();
      }).toThrow();
    });
  });
});
