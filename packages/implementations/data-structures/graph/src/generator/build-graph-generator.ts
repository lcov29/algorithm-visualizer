import { EventSubscriberManager } from '@algorithm-visualizer/event-handling';
import {
  GraphCreatedEvent,
  GraphGeneratorBuilder,
} from '@algorithm-visualizer/graph-contract';
import {
  getRandomIntegerBetween,
  getRandomListItem,
} from '@algorithm-visualizer/randomization';

import { EdgeList } from '../structure/edge-list';
import { NodeList } from '../structure/node-list';
import { EdgeListGenerator, IEdgeListGenerator } from './edge-list-generator';
import { GraphGenerator } from './graph-generator';
import { INodeListGenerator, NodeListGenerator } from './node-list-generator';

export type NodeListGeneratorFactory = () => INodeListGenerator;
export type EdgeListGeneratorFactory = (
  nodeIds: number[],
) => IEdgeListGenerator;

export const buildGraphGenerator: GraphGeneratorBuilder = () => {
  const createEdgeListGenerator: EdgeListGeneratorFactory = (
    nodeIds: number[],
  ) =>
    new EdgeListGenerator({
      edgeList: new EdgeList(),
      getRandomIntegerBetween: getRandomIntegerBetween,
      getRandomListItem: getRandomListItem,
      nodeIds,
    });

  const createNodeListGenerator: NodeListGeneratorFactory = () => {
    return new NodeListGenerator({
      nodeList: new NodeList(),
      getRandomIntegerBetween: getRandomIntegerBetween,
    });
  };

  const subscriberManager = new EventSubscriberManager<GraphCreatedEvent>();

  return new GraphGenerator({
    createEdgeListGenerator,
    createNodeListGenerator,
    subscriberManager,
  });
};
