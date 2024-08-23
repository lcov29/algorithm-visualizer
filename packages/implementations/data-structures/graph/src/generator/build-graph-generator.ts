import { EventSubscriberManager } from '@algorithm-visualizer/event-handling';
import {
  GraphCreatedEvent,
  GraphGeneratorBuilder,
} from '@algorithm-visualizer/graph-contract';

import { GraphGenerator } from './graph-generator';

export const buildGraphGenerator: GraphGeneratorBuilder = () => {
  const subscriberManager = new EventSubscriberManager<GraphCreatedEvent>();
  return new GraphGenerator({ subscriberManager });
};
