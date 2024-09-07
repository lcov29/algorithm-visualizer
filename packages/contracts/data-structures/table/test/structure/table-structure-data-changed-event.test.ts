import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableStructureDataChangedEvent } from '../../src';

describe('TableStructureDataChangedEvent', () => {
  const rowId = 3;
  const columnId = 6;
  const data = 'someData';
  const dataChangedEvent = new TableStructureDataChangedEvent({
    rowId,
    columnId,
    data,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    ['rowId', rowId],
    ['columnId', columnId],
    ['data', data],
  ])('%s()', (methodName, expectedResult) => {
    it(`getter returns the specified ${methodName} value`, () => {
      // @ts-expect-error invoke method by string name
      expect(dataChangedEvent[methodName]).toBe(expectedResult);
    });

    it('setter throws an invalid operation error', () => {
      expect(
        // @ts-expect-error invoke method by string name
        () => (dataChangedEvent[methodName] = expectedResult),
      ).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property ${methodName} is forbidden`,
        }),
      );
    });
  });
});
