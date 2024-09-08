import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { TableViewInitializedEvent } from '../../src';

describe('TableViewInitializedEvent', () => {
  const table = [
    [
      [
        { label: 'foo1', text: 'bar1' },
        { label: 'foo2', text: 'bar2' },
      ],
    ],
  ];
  const viewInitializedEvent = new TableViewInitializedEvent({ table });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('table', () => {
    it('getter returns the specified table value', () => {
      expect(viewInitializedEvent.table).toEqual(table);
    });

    it('setter throws an invalid operation error', () => {
      expect(() => {
        viewInitializedEvent.table = table;
      }).toThrow(
        new InvalidOperationError({
          message: `Writing to readonly property table is forbidden`,
        }),
      );
    });
  });
});
