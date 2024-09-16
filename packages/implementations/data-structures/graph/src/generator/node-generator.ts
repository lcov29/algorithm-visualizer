import {
  GraphGeneratorConfig,
  IGeneratedNode,
} from '@algorithm-visualizer/graph-contract';
import { RandomIntegerGenerator } from '@algorithm-visualizer/randomization-contract';

import { NodeGeneratorError } from './node-generator-error';

export interface INodeGenerator {
  generateRandomNodes: (config: GraphGeneratorConfig) => IGeneratedNode[];
}

interface INodeGeneratorArgs {
  getRandomIntegerBetween: RandomIntegerGenerator;
}

export class NodeGenerator implements INodeGenerator {
  private _getRandomIntegerBetween: RandomIntegerGenerator;

  constructor(args: INodeGeneratorArgs) {
    this._getRandomIntegerBetween = args.getRandomIntegerBetween;
  }

  generateRandomNodes(config: GraphGeneratorConfig) {
    try {
      const { min, max } = config.nodeAmount;
      const nodeAmount = this._getRandomIntegerBetween(min, max);
      return new Array(nodeAmount)
        .fill(null)
        .map((_, index) => ({ id: index }));
    } catch (error) {
      throw new NodeGeneratorError({
        message:
          'Failed to generate random nodes according to the passed configuration',
        config,
        cause: error as Error,
      });
    }
  }
}
