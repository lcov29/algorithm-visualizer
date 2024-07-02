import { RandomIntegerGenerator } from '@algorithm-visualizer/random';

import { INode } from '../structure/node-list';
import { IGraphGeneratorConfig } from './configuration';

export interface INodeGenerator {
  generateRandomNodes(): Omit<INode, 'id'>[];
}

interface NodeGeneratorArgs {
  config: IGraphGeneratorConfig;
  getRandomIntegerBetween: RandomIntegerGenerator;
}

export class NodeGenerator implements INodeGenerator {
  private _config: IGraphGeneratorConfig;
  private _getRandomIntegerBetween: RandomIntegerGenerator;

  constructor(args: NodeGeneratorArgs) {
    this._config = args.config;
    this._getRandomIntegerBetween = args.getRandomIntegerBetween;
  }

  generateRandomNodes() {
    const { min, max } = this._config.nodeAmount;
    const nodeAmount = this._getRandomIntegerBetween(min, max);

    const nodes = new Array(nodeAmount)
      .fill(null)
      .map((_, index) => ({ label: this._getLabelCharacterFor(index) }));

    return nodes;
  }

  private _getLabelCharacterFor(index: number) {
    const utfCodeCharacterA = 65;
    const utfCodeCurrentCharacter = utfCodeCharacterA + index;
    return String.fromCharCode(utfCodeCurrentCharacter);
  }
}
