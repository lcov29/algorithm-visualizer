import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  TableCellHighlightStyleClass,
  TableViewRowHighlightAddedEvent,
} from '../../src';

describe('TableViewRowHighlightAddedEvent', () => {
  const rowId = 3;
  const highlightClass: TableCellHighlightStyleClass =
    'tableCellHighlightStyle1';
  const rowHighlightAddedEvent = new TableViewRowHighlightAddedEvent({
    rowId,
    highlightClass,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['rowId', rowId],
    ['highlightClass', highlightClass],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(rowHighlightAddedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (rowHighlightAddedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
