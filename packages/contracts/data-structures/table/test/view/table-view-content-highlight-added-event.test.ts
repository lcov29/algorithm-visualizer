import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  TableContentHighlightStyleClass,
  TableViewContentHighlightAddedEvent,
} from '../../src';

describe('TableViewContentHighlightAddedEvent', () => {
  const rowId = 3;
  const columnId = 6;
  const contentId = 9;
  const highlightClass: TableContentHighlightStyleClass =
    'tableContentHighlightStyle1';
  const contentHighlightAddedEvent = new TableViewContentHighlightAddedEvent({
    rowId,
    columnId,
    contentId,
    highlightClass,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['rowId', rowId],
    ['columnId', columnId],
    ['contentId', contentId],
    ['highlightClass', highlightClass],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(contentHighlightAddedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (contentHighlightAddedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
