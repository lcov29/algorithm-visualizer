import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import {
  NumberTableGeneratorConfig,
  NumberTableGeneratorError,
} from '../../../src';

describe('GraphGeneratorError', () => {
  const cause = new RangeError('This caused the number table generator error');
  const config = new NumberTableGeneratorConfig({
    rowAmountRange: new IntegerRange({ min: 2, max: 3 }),
    columnAmountRange: new IntegerRange({ min: 3, max: 4 }),
    numberRange: new IntegerRange({ min: 3, max: 125 }),
  });
  const error = new NumberTableGeneratorError({
    message: 'Number table generator error',
    config,
    cause,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('config', () => {
    it(`getter returns the specified config value`, () => {
      expect(error.config).toBe(config);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => (error.config = config)).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property config is forbidden`,
        }),
      );
    });
  });
});
