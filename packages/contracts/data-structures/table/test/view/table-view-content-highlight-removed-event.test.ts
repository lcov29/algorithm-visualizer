import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableViewContentHighlightRemovedEvent } from '../../src';

describe('TableViewContentHighlightRemovedEvent', () => {
  const rowId = 3;
  const columnId = 6;
  const contentId = 9;
  const contentHighlightRemovedEvent =
    new TableViewContentHighlightRemovedEvent({
      rowId,
      columnId,
      contentId,
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['rowId', rowId],
    ['columnId', columnId],
    ['contentId', contentId],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(contentHighlightRemovedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (contentHighlightRemovedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
