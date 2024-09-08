import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableViewCellHighlightRemovedEvent } from '../../src';

describe('TableViewCellHighlightRemovedEvent', () => {
  const rowId = 3;
  const columnId = 6;
  const cellHighlightRemovedEvent = new TableViewCellHighlightRemovedEvent({
    rowId,
    columnId,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['rowId', rowId],
    ['columnId', columnId],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(cellHighlightRemovedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (cellHighlightRemovedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
