import { IEventSubscriberManager } from '@algorithm-visualizer/event-handling-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';
import { NumberTableGeneratorConfig } from '@algorithm-visualizer/table-contract';

import { NumberTableGenerator } from '../../src';

const mockGetRandomInteger = jest.fn();
const mockGetRandomShuffledList = jest.fn();
const mockNotifySubscribers = jest.fn();

const mockSubscriberManager = {
  addSubscriber: jest.fn(),
  removeSubscriber: jest.fn(),
  notifySubscribers: mockNotifySubscribers,
} as Partial<IEventSubscriberManager> as IEventSubscriberManager;

function isValueBetween(args: { value: number; min: number; max: number }) {
  const { value, min, max } = args;
  return min <= value && value <= max;
}

describe('NumberTableGenerator', () => {
  let generator: NumberTableGenerator;

  beforeEach(() => {
    jest.resetAllMocks();
    generator = new NumberTableGenerator({
      getRandomInteger: mockGetRandomInteger,
      getRandomShuffledList: mockGetRandomShuffledList,
      subscriberManager: mockSubscriberManager,
    });
    mockGetRandomInteger.mockImplementation((min, max) => max);
  });

  describe('generateTable()', () => {
    describe.each([
      ['not set', { generateValueSequence: false }],
      ['set', { generateValueSequence: true }],
    ])('when config argument generateValueSequence is %s', (_, configArgs) => {
      let config: NumberTableGeneratorConfig;

      beforeEach(() => {
        config = new NumberTableGeneratorConfig({
          rowAmountRange: new IntegerRange({ min: 1, max: 2 }),
          columnAmountRange: new IntegerRange({ min: 3, max: 4 }),
          numberRange: new IntegerRange({ min: 2, max: 10 }),
          valueSequenceAlignment: 'Asc',
          ...configArgs,
        });
        generator.generateTable(config);
      });

      it('emits a TableGeneratedEvent', () => {
        expect(mockNotifySubscribers).toHaveBeenCalledTimes(1);
      });

      describe('table data', () => {
        it('is within the specified configuration rowAmount range', () => {
          const data = mockNotifySubscribers.mock.calls[0][0].data.length;
          const { min, max } = config.rowAmountRange;
          expect(isValueBetween({ value: data, min, max })).toBe(true);
        });

        it('is within the specified configuration columnAmount range', () => {
          const data = mockNotifySubscribers.mock.calls[0][0]
            .data as number[][];
          const { min, max } = config.columnAmountRange;
          data.forEach(row => {
            expect(isValueBetween({ value: row.length, min, max })).toBe(true);
          });
        });

        it('has values within the specified configuration number range', () => {
          const data = mockNotifySubscribers.mock.calls[0][0]
            .data as number[][];
          const { min, max } = config.numberRange;
          data.forEach(row => {
            row.forEach(value => {
              expect(isValueBetween({ value, min, max })).toBe(true);
            });
          });
        });
      });
    });

    describe.each([
      [
        'Asc',
        'ascending',
        'Asc',
        [
          [2, 3, 4, 5],
          [6, 7, 8, 9],
        ],
      ],
      [
        'Desc',
        'descending',
        'Desc',
        [
          [9, 8, 7, 6],
          [5, 4, 3, 2],
        ],
      ],
    ])(
      'when the config argument valueSequenceAlignment is set to "%s"',
      (_, option, valueSequenceAlignment, expectedData) => {
        let config: NumberTableGeneratorConfig;

        it(`returns a sequence of ${option} number values`, () => {
          config = new NumberTableGeneratorConfig({
            rowAmountRange: new IntegerRange({ min: 1, max: 2 }),
            columnAmountRange: new IntegerRange({ min: 3, max: 4 }),
            numberRange: new IntegerRange({ min: 2, max: 10 }),
            generateValueSequence: true,
            valueSequenceAlignment: valueSequenceAlignment as 'Asc' | 'Desc',
          });
          generator.generateTable(config);
          const data = mockNotifySubscribers.mock.calls[0][0]
            .data as number[][];
          expect(data).toEqual(expectedData);
        });
      },
    );

    describe('when the config argument valueSequenceAlignment is set to "Random"', () => {
      it('returns a randomly sorted sequence of number values', () => {
        mockGetRandomShuffledList.mockImplementation((values: number[]) => {
          for (let i = 0; i < values.length - 1; i = i + 2) {
            const swapValue = values[i];
            values[i] = values[i + 1];
            values[i + 1] = swapValue;
          }
          return values;
        });
        const config = new NumberTableGeneratorConfig({
          rowAmountRange: new IntegerRange({ min: 1, max: 2 }),
          columnAmountRange: new IntegerRange({ min: 3, max: 4 }),
          numberRange: new IntegerRange({ min: 2, max: 10 }),
          generateValueSequence: true,
          valueSequenceAlignment: 'Random',
        });
        generator.generateTable(config);
        const data = mockNotifySubscribers.mock.calls[0][0].data as number[][];
        expect(data).toEqual([
          [3, 2, 5, 4],
          [7, 6, 9, 8],
        ]);
      });
    });
  });
});
