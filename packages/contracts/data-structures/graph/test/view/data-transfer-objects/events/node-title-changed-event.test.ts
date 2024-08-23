import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeTitleChangedEvent } from '../../../../src';

describe('NodeTitleChangedEvent', () => {
  const nodeTitleChangedEvent = new NodeTitleChangedEvent({
    nodeId: 3,
    title: 'foo',
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['nodeId', 3],
    ['title', 'foo'],
  ])('%s()', (methodName, expectedValue) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error reference to a method by its string name
      expect(nodeTitleChangedEvent[methodName]).toBe(expectedValue);
    });

    it('setters throws an invalid operation error', () => {
      // @ts-expect-error reference to a method by its string name
      expect(() => (nodeTitleChangedEvent[methodName] = expectedValue)).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
