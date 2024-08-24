import {
  IEventSubscriber,
  IEventSubscriberManager,
} from '@algorithm-visualizer/event-handling-contract';
import {
  GraphCreatedEvent,
  GraphGeneratorConfig,
  GraphGeneratorError,
  IEdgeList,
  IGraphGenerator,
} from '@algorithm-visualizer/graph-contract';
import {
  getRandomIntegerBetween,
  getRandomListItem,
} from '@algorithm-visualizer/randomization';

import { EdgeList } from '../structure/edge-list';
import { EdgeListGenerator } from './edge-list-generator';
import { generateRandomNodeList } from './node-list-generator';

interface IGraphGeneratorArgs {
  subscriberManager: IEventSubscriberManager<GraphCreatedEvent>;
}

export class GraphGenerator implements IGraphGenerator {
  private _subscriberManager: IEventSubscriberManager<GraphCreatedEvent>;

  constructor({ subscriberManager }: IGraphGeneratorArgs) {
    this._subscriberManager = subscriberManager;
  }

  addSubscriber(subscriber: IEventSubscriber<GraphCreatedEvent>) {
    return this._subscriberManager.addSubscriber(subscriber);
  }

  removeSubscriber(subscriberId: number) {
    this._subscriberManager.removeSubscriber(subscriberId);
  }

  generateGraph(config: GraphGeneratorConfig) {
    try {
      const edgeList: IEdgeList = new EdgeList();

      const nodeList = generateRandomNodeList({
        config,
        getRandomIntegerBetween,
      });

      const edgeGenerator = new EdgeListGenerator({
        config,
        nodeIds: nodeList.nodeIds,
        getRandomIntegerBetween,
        getRandomListItem,
      });

      for (const edge of edgeGenerator.generateRandomEdges().edges) {
        edgeList.addEdge(edge);
      }

      const graphCreatedEvent = new GraphCreatedEvent({
        nodes: nodeList,
        edges: edgeList,
      });

      this._subscriberManager.notifySubscribers(graphCreatedEvent);
    } catch (error) {
      throw new GraphGeneratorError({
        message:
          'Failed to generate a random graph according to passed configuration',
        config,
        cause: error as Error,
      });
    }
  }
}
