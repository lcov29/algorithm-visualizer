import { EdgeWeightChangedEvent } from '../../src/events/edge-weight-changed-event';

describe('EdgeWeightChangedEvent', () => {
  const edgeWeightChangedEvent = new EdgeWeightChangedEvent({
    edgeId: 3,
    newWeight: 7,
  });

  describe.each([
    [
      'edgeId',
      edgeWeightChangedEvent.edgeId,
      3,
      // @ts-expect-error 'nodeId' is a read-only-property
      () => (edgeWeightChangedEvent.edgeId = 3),
    ],
    [
      'newWeight',
      edgeWeightChangedEvent.newWeight,
      7,
      // @ts-expect-error 'currentLabel' is a read-only-property
      () => (nodeLabelChangedEvent.newWeight = 11),
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
