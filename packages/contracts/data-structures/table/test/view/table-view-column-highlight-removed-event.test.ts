import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableViewColumnHighlightRemovedEvent } from '../../src';

describe('TableViewColumnHighlightRemovedEvent', () => {
  const columnId = 6;
  const columnHighlightRemovedEvent = new TableViewColumnHighlightRemovedEvent({
    columnId,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('columnId', () => {
    it('getter returns the specified columnId value', () => {
      expect(columnHighlightRemovedEvent.columnId).toBe(columnId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => (columnHighlightRemovedEvent.columnId = columnId)).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property columnId is forbidden',
        }),
      );
    });
  });
});
