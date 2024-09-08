import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableViewRowsSwitchedEvent } from '../../src';

describe('TableViewRowsSwitchedEvent', () => {
  const rowAId = 3;
  const rowBId = 6;
  const rowsSwitchedEvent = new TableViewRowsSwitchedEvent({
    rowAId,
    rowBId,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['rowAId', rowAId],
    ['rowBId', rowBId],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(rowsSwitchedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (rowsSwitchedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
