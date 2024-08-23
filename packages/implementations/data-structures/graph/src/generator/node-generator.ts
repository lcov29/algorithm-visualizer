import {
  GraphGeneratorConfig,
  INode,
} from '@algorithm-visualizer/graph-contract';
import { RandomIntegerGenerator } from '@algorithm-visualizer/randomization-contract';

import { NodeGeneratorError } from './node-generator-error';

export interface INodeGenerator {
  generateRandomNodes(): Omit<INode, 'id'>[];
}

interface INodeGeneratorArgs {
  config: GraphGeneratorConfig;
  getRandomIntegerBetween: RandomIntegerGenerator;
}

export class NodeGenerator implements INodeGenerator {
  private _config: GraphGeneratorConfig;
  private _getRandomIntegerBetween: RandomIntegerGenerator;

  constructor(args: INodeGeneratorArgs) {
    this._config = args.config;
    this._getRandomIntegerBetween = args.getRandomIntegerBetween;
  }

  generateRandomNodes() {
    try {
      const { min, max } = this._config.nodeAmount;
      const nodeAmount = this._getRandomIntegerBetween(min, max);

      const nodes = new Array(nodeAmount)
        .fill(null)
        .map((_, index) => ({ label: this._getLabelCharacterFor(index) }));

      return nodes;
    } catch (error) {
      throw new NodeGeneratorError({
        message:
          'Failed to generate random nodes according to the passed configuration',
        config: this._config,
        cause: error as Error,
      });
    }
  }

  private _getLabelCharacterFor(index: number) {
    const utfCodeCharacterA = 65;
    const utfCodeCurrentCharacter = utfCodeCharacterA + index;
    return String.fromCharCode(utfCodeCurrentCharacter);
  }
}
