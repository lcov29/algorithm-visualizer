import {
  GraphGeneratorConfig,
  INodeList,
} from '@algorithm-visualizer/graph-contract';
import { RandomIntegerGenerator } from '@algorithm-visualizer/randomization-contract';

import { NodeList } from '../structure/node-list';
import { NodeListGeneratorError } from './node-list-generator-error';

interface IGenerateRandomNodeListArgs {
  config: GraphGeneratorConfig;
  getRandomIntegerBetween: RandomIntegerGenerator;
}

export function generateRandomNodeList(
  args: IGenerateRandomNodeListArgs,
): INodeList {
  const { config, getRandomIntegerBetween } = args;
  try {
    const { min, max } = config.nodeAmount;
    const nodeAmount = getRandomIntegerBetween(min, max);
    const nodeList = new NodeList();
    for (let i = 0; i < nodeAmount; i++) {
      nodeList.addNode();
    }
    return nodeList;
  } catch (error) {
    throw new NodeListGeneratorError({
      message:
        'Failed to generate random nodes according to the passed configuration',
      config,
      cause: error as Error,
    });
  }
}
