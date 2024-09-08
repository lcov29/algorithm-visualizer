import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableViewCellHighlightAddedEvent } from '../../src';
import { TableCellHighlightStyleClass } from '../../src';

describe('TableViewCellHighlightAddedEvent', () => {
  const rowId = 3;
  const columnId = 6;
  const highlightClass: TableCellHighlightStyleClass =
    'tableCellHighlightStyle1';
  const cellHighlightAddedEvent = new TableViewCellHighlightAddedEvent({
    rowId,
    columnId,
    highlightClass,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['rowId', rowId],
    ['columnId', columnId],
    ['highlightClass', highlightClass],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(cellHighlightAddedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (cellHighlightAddedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
