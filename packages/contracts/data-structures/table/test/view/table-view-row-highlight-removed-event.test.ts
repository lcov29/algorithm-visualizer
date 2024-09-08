import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableViewRowHighlightRemovedEvent } from '../../src';

describe('TableViewRowHighlightRemovedEvent', () => {
  const rowId = 3;
  const rowHighlightRemovedEvent = new TableViewRowHighlightRemovedEvent({
    rowId,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('rowId', () => {
    it('getter returns the specified rowId value', () => {
      expect(rowHighlightRemovedEvent.rowId).toBe(rowId);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        rowHighlightRemovedEvent.rowId = rowId;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property rowId is forbidden',
        }),
      );
    });
  });
});
