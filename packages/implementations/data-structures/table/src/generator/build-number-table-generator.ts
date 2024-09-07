import { EventSubscriberManager } from '@algorithm-visualizer/event-handling';
import {
  getRandomIntegerBetween,
  getRandomShuffledList,
} from '@algorithm-visualizer/randomization';
import { TableGeneratedEvent } from '@algorithm-visualizer/table-contract';

import { NumberTableGenerator } from './number-table-generator';

export function buildNumberTableGenerator() {
  const getRandomInteger = getRandomIntegerBetween;
  const subscriberManager = new EventSubscriberManager<
    TableGeneratedEvent<number>
  >();
  return new NumberTableGenerator({
    getRandomInteger,
    getRandomShuffledList,
    subscriberManager,
  });
}
