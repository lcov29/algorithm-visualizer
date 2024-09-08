import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableViewColumnsSwitchedEvent } from '../../src';

describe('TableViewColumnsSwitchedEvent', () => {
  const columnAId = 3;
  const columnBId = 6;
  const columnsSwitchedEvent = new TableViewColumnsSwitchedEvent({
    columnAId,
    columnBId,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['columnAId', columnAId],
    ['columnBId', columnBId],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(columnsSwitchedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (columnsSwitchedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
