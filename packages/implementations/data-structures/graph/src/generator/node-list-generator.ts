import {
  GraphGeneratorConfig,
  INodeList,
} from '@algorithm-visualizer/graph-contract';
import { RandomIntegerGenerator } from '@algorithm-visualizer/randomization-contract';

import { NodeListGeneratorError } from './node-list-generator-error';

export interface INodeListGenerator {
  generateRandomNodeList: (config: GraphGeneratorConfig) => INodeList;
}

interface INodeListGeneratorArgs {
  nodeList: INodeList;
  getRandomIntegerBetween: RandomIntegerGenerator;
}

export class NodeListGenerator implements INodeListGenerator {
  private _nodeList: INodeList;
  private _getRandomIntegerBetween: RandomIntegerGenerator;

  constructor(args: INodeListGeneratorArgs) {
    this._nodeList = args.nodeList;
    this._getRandomIntegerBetween = args.getRandomIntegerBetween;
  }

  generateRandomNodeList(config: GraphGeneratorConfig) {
    try {
      const { min, max } = config.nodeAmount;
      const nodeAmount = this._getRandomIntegerBetween(min, max);
      for (let i = 0; i < nodeAmount; i++) {
        this._nodeList.addNode();
      }
      return this._nodeList;
    } catch (error) {
      throw new NodeListGeneratorError({
        message:
          'Failed to generate random nodes according to the passed configuration',
        config,
        cause: error as Error,
      });
    }
  }
}
