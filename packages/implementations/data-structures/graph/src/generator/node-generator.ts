import {
  GraphGeneratorConfig,
  INode,
} from '@algorithm-visualizer/graph-contract';
import { IRandomIntegerGenerator } from '@algorithm-visualizer/randomization-contract';

import { NodeGeneratorError } from './node-generator-error';

export interface INodeGenerator {
  generateRandomNodes(): Omit<INode, 'id'>[];
}

interface NodeGeneratorArgs {
  config: GraphGeneratorConfig;
  getRandomIntegerBetween: IRandomIntegerGenerator;
}

export class NodeGenerator implements INodeGenerator {
  private _config: GraphGeneratorConfig;
  private _getRandomIntegerBetween: IRandomIntegerGenerator;

  constructor(args: NodeGeneratorArgs) {
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
