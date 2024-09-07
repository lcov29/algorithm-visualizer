import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableGeneratedEvent } from '../../../src';

describe('TableGeneratedEvent', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const data = [[1, 2, 3]];
  const event = new TableGeneratedEvent({ data });

  describe('data', () => {
    it(`getter returns the specified data value`, () => {
      expect(event.data).toBe(data);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => (event.data = data)).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property data is forbidden`,
        }),
      );
    });
  });
});
