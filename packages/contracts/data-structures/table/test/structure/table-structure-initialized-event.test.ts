import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableStructureInitializedEvent } from '../../src';

describe('TableStructureInitializedEvent', () => {
  const data = [['someData']];
  const dataChangedEvent = new TableStructureInitializedEvent({
    data,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('data', () => {
    it('getter returns the specified data value', () => {
      expect(dataChangedEvent.data).toBe(data);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => (dataChangedEvent.data = data)).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property data is forbidden`,
        }),
      );
    });
  });
});
