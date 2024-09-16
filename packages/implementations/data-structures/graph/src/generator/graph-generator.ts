import {
  IEventSubscriber,
  IEventSubscriberManager,
} from '@algorithm-visualizer/event-handling-contract';
import {
  GraphGeneratorConfig,
  GraphGeneratorError,
  GraphGeneratorGraphGeneratedEvent,
  IGeneratedNode,
  IGraphGenerator,
} from '@algorithm-visualizer/graph-contract';

import { IEdgeGenerator } from './edge-generator';
import { INodeGenerator } from './node-generator';

interface IGraphGeneratorArgs {
  createEdgeGenerator: (nodes: IGeneratedNode[]) => IEdgeGenerator;
  createNodeGenerator: () => INodeGenerator;
  subscriberManager: IEventSubscriberManager<GraphGeneratorGraphGeneratedEvent>;
}

export class GraphGenerator implements IGraphGenerator {
  private _createEdgeGenerator: (nodes: IGeneratedNode[]) => IEdgeGenerator;
  private _createNodeGenerator: () => INodeGenerator;
  private _subscriberManager: IEventSubscriberManager<GraphGeneratorGraphGeneratedEvent>;

  constructor(args: IGraphGeneratorArgs) {
    this._createEdgeGenerator = args.createEdgeGenerator;
    this._createNodeGenerator = args.createNodeGenerator;
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
      const nodeGenerator = this._createNodeGenerator();
      const nodes = nodeGenerator.generateRandomNodes(config);

      const edgeGenerator = this._createEdgeGenerator(nodes);
      const edges = edgeGenerator.generateRandomEdges(config);

      this._subscriberManager.notifySubscribers(
        new GraphGeneratorGraphGeneratedEvent({ nodes, edges }),
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
