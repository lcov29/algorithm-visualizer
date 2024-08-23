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
  INodeList,
} from '@algorithm-visualizer/graph-contract';
import {
  getRandomIntegerBetween,
  getRandomListItem,
} from '@algorithm-visualizer/randomization';

import { EdgeList } from '../structure/edge-list';
import { NodeList } from '../structure/node-list';
import { EdgeGenerator } from './edge-generator';
import { NodeGenerator } from './node-generator';

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
      const nodeList: INodeList = new NodeList();
      const edgeList: IEdgeList = new EdgeList();

      const nodeGenerator = new NodeGenerator({
        config,
        getRandomIntegerBetween,
      });

      for (const node of nodeGenerator.generateRandomNodes()) {
        nodeList.addNode(node);
      }

      const edgeGenerator = new EdgeGenerator({
        config,
        nodes: nodeList.list,
        getRandomIntegerBetween,
        getRandomListItem,
      });

      for (const edge of edgeGenerator.generateRandomEdges()) {
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
