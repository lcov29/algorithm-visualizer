import { EventSubscriberManager } from '@algorithm-visualizer/event-handling';
import {
  GraphGeneratorBuilder,
  IGeneratedNode,
} from '@algorithm-visualizer/graph-contract';
import {
  getRandomIntegerBetween,
  getRandomListItem,
} from '@algorithm-visualizer/randomization';

import { EdgeGenerator, IEdgeGenerator } from './edge-generator';
import { GraphGenerator } from './graph-generator';
import { INodeGenerator, NodeGenerator } from './node-generator';

export type NodeGeneratorFactory = () => INodeGenerator;
export type EdgeGeneratorFactory = (nodes: IGeneratedNode[]) => IEdgeGenerator;

export const buildGraphGenerator: GraphGeneratorBuilder = () => {
  const createEdgeGenerator: EdgeGeneratorFactory = (nodes: IGeneratedNode[]) =>
    new EdgeGenerator({
      getRandomIntegerBetween: getRandomIntegerBetween,
      getRandomListItem: getRandomListItem,
      nodes,
    });

  const createNodeGenerator: NodeGeneratorFactory = () => {
    return new NodeGenerator({
      getRandomIntegerBetween: getRandomIntegerBetween,
    });
  };

  const subscriberManager = new EventSubscriberManager();

  return new GraphGenerator({
    createEdgeGenerator,
    createNodeGenerator,
    subscriberManager,
  });
};
