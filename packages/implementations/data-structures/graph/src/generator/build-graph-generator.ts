import { EventSubscriberManager } from '@algorithm-visualizer/event-handling';
import {
  GraphCreatedEvent,
  IGraphGeneratorBuilder,
} from '@algorithm-visualizer/graph-contract';

import { GraphGenerator } from './graph-generator';

export const buildGraphGenerator: IGraphGeneratorBuilder = () => {
  const subscriberManager = new EventSubscriberManager<GraphCreatedEvent>();
  return new GraphGenerator({ subscriberManager });
};
