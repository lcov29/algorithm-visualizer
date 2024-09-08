import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableViewColumnHighlightAddedEvent } from '../../src';
import { TableCellHighlightStyleClass } from '../../src';

describe('TableViewColumnHighlightAddedEvent', () => {
  const columnId = 6;
  const highlightClass: TableCellHighlightStyleClass =
    'tableCellHighlightStyle1';
  const columnHighlightAddedEvent = new TableViewColumnHighlightAddedEvent({
    columnId,
    highlightClass,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['columnId', columnId],
    ['highlightClass', highlightClass],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(columnHighlightAddedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (columnHighlightAddedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
