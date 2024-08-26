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

  describe('title()', () => {
    it(`getter returns the specified title value`, () => {
      expect(nodeTitleChangedEvent.title).toBe('foo');
    });

    it('setters throws an invalid operation error', () => {
      expect(() => (nodeTitleChangedEvent.title = 'foo')).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property title is forbidden`,
        }),
      );
    });
  });
});
