import {
  IEventSubscriber,
  IEventSubscriberManager,
} from '@algorithm-visualizer/event-handling-contract';
import {
  RandomIntegerGenerator,
  RandomListShuffler,
} from '@algorithm-visualizer/randomization-contract';
import {
  INumberTableGenerator,
  NumberTableGeneratorConfig,
  TableGeneratedEvent,
} from '@algorithm-visualizer/table-contract';

interface INumberTableGeneratorArgs {
  getRandomInteger: RandomIntegerGenerator;
  getRandomShuffledList: RandomListShuffler;
  subscriberManager: IEventSubscriberManager;
}

export class NumberTableGenerator implements INumberTableGenerator {
  private _getRandomInteger: RandomIntegerGenerator;
  private _getRandomShuffledList: RandomListShuffler;
  private _subscriberManager: IEventSubscriberManager;

  constructor(args: INumberTableGeneratorArgs) {
    this._getRandomInteger = args.getRandomInteger;
    this._getRandomShuffledList = args.getRandomShuffledList;
    this._subscriberManager = args.subscriberManager;
  }

  addSubscriber(subscriber: IEventSubscriber) {
    return this._subscriberManager.addSubscriber(subscriber);
  }

  removeSubscriber(subscriberId: number) {
    this._subscriberManager.removeSubscriber(subscriberId);
  }

  generateTable(config: NumberTableGeneratorConfig) {
    const { generateValueSequence } = config;

    const data = generateValueSequence
      ? this._buildRandomNumberSequenceTable(config)
      : this._buildRandomNumberTable(config);

    this._subscriberManager.notifySubscribers(
      new TableGeneratedEvent({ data }),
    );
  }

  private _buildRandomNumberSequenceTable(config: NumberTableGeneratorConfig) {
    const { min: rowMin, max: rowMax } = config.rowAmountRange;
    const { min: columnMin, max: columnMax } = config.columnAmountRange;
    const { min: valueMin } = config.numberRange;

    const rowAmount = this._getRandomInteger(rowMin, rowMax);
    const columnAmount = this._getRandomInteger(columnMin, columnMax);
    const numberValueAmount = rowAmount * columnAmount;

    let numberValues = new Array(numberValueAmount)
      .fill(null)
      .map((_, index) => valueMin + index);

    if (config.valueSequenceAlignment === 'Desc') {
      numberValues = numberValues.toSorted((valueA, valueB) => valueB - valueA);
    }

    if (config.valueSequenceAlignment === 'Random') {
      numberValues = this._getRandomShuffledList(numberValues);
    }

    const data: number[][] = [];

    for (let rowId = 0; rowId < rowAmount; rowId++) {
      const row: number[] = [];

      for (let columnId = 0; columnId < columnAmount; columnId++) {
        const numberValueIndex = rowId * columnAmount + columnId;
        row.push(numberValues[numberValueIndex]);
      }

      data.push(row);
    }

    return data;
  }

  private _buildRandomNumberTable(config: NumberTableGeneratorConfig) {
    const data: number[][] = [];

    const { min: rowMin, max: rowMax } = config.rowAmountRange;
    const { min: columnMin, max: columnMax } = config.columnAmountRange;
    const { min: valueMin, max: valueMax } = config.numberRange;

    const rowAmount = this._getRandomInteger(rowMin, rowMax);
    const columnAmount = this._getRandomInteger(columnMin, columnMax);

    for (let rowId = 0; rowId < rowAmount; rowId++) {
      const row: number[] = [];

      for (let columnId = 0; columnId < columnAmount; columnId++) {
        row.push(this._getRandomInteger(valueMin, valueMax));
      }

      data.push(row);
    }

    return data;
  }
}
