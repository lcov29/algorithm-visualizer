import {
  GraphGeneratorConfig,
  IGraphGenerator,
} from '@algorithm-visualizer/graph-contract';

import { EventHandlerChain } from '../../../../event-handling';
import {
  getRandomIntegerBetween,
  getRandomListItem,
} from '../../../../randomization';
import { EdgeList, IEdgeList } from '../structure/edge-list';
import { Graph } from '../structure/graph';
import { INodeList, NodeList } from '../structure/node-list';
import { EdgeGenerator } from './edge-generator';
import { NodeGenerator } from './node-generator';

export const generateGraph: IGraphGenerator = (
  config: GraphGeneratorConfig,
) => {
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

  const graph = new Graph({
    nodes: nodeList,
    edges: edgeList,
    eventHandlerChain: new EventHandlerChain({ abortAfterSuccess: true }),
  });

  return graph;
};
