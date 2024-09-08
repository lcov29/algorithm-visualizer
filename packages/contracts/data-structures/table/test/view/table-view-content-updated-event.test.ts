import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { ITableViewContent, TableViewContentUpdatedEvent } from '../../src';

describe('TableViewContentUpdatedEvent', () => {
  const rowId = 3;
  const columnId = 6;
  const newContent: ITableViewContent[] = [{ label: 'foo', text: 'bar' }];
  const contentUpdatedEvent = new TableViewContentUpdatedEvent({
    rowId,
    columnId,
    newContent,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['rowId', rowId],
    ['columnId', columnId],
    ['newContent', newContent],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(contentUpdatedEvent[methodName]).toEqual(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (contentUpdatedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
