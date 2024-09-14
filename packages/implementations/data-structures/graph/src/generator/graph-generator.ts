import {
  IEventSubscriber,
  IEventSubscriberManager,
} from '@algorithm-visualizer/event-handling-contract';
import {
  GraphGeneratorConfig,
  GraphGeneratorError,
  GraphGeneratorGraphGeneratedEvent,
  IGraphGenerator,
} from '@algorithm-visualizer/graph-contract';

import { IEdgeListGenerator } from './edge-list-generator';
import { INodeListGenerator } from './node-list-generator';

interface IGraphGeneratorArgs {
  createEdgeListGenerator: (nodeIds: number[]) => IEdgeListGenerator;
  createNodeListGenerator: () => INodeListGenerator;
  subscriberManager: IEventSubscriberManager<GraphGeneratorGraphGeneratedEvent>;
}

export class GraphGenerator implements IGraphGenerator {
  private _createEdgeListGenerator: (nodeIds: number[]) => IEdgeListGenerator;
  private _createNodeListGenerator: () => INodeListGenerator;
  private _subscriberManager: IEventSubscriberManager<GraphGeneratorGraphGeneratedEvent>;

  constructor(args: IGraphGeneratorArgs) {
    this._createEdgeListGenerator = args.createEdgeListGenerator;
    this._createNodeListGenerator = args.createNodeListGenerator;
    this._subscriberManager = args.subscriberManager;
  }

  addSubscriber(
    subscriber: IEventSubscriber<GraphGeneratorGraphGeneratedEvent>,
  ) {
    return this._subscriberManager.addSubscriber(subscriber);
  }

  removeSubscriber(subscriberId: number) {
    this._subscriberManager.removeSubscriber(subscriberId);
  }

  generateGraph(config: GraphGeneratorConfig) {
    try {
      const nodeListGenerator = this._createNodeListGenerator();
      const nodeList = nodeListGenerator.generateRandomNodeList(config);

      const edgeListGenerator = this._createEdgeListGenerator(nodeList.nodeIds);
      const edgeList = edgeListGenerator.generateRandomEdgeList(config);

      this._subscriberManager.notifySubscribers(
        new GraphGeneratorGraphGeneratedEvent({
          nodes: nodeList,
          edges: edgeList,
        }),
      );
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
