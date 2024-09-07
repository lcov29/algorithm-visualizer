import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NumberTableGeneratorConfig } from './number-table-generator-config';

interface INumberTableGeneratorArgs {
  message: string;
  config: NumberTableGeneratorConfig;
  cause?: Error | object;
}

export class NumberTableGeneratorError extends Error {
  private _config: NumberTableGeneratorConfig;

  constructor({ message, config, cause = {} }: INumberTableGeneratorArgs) {
    super(message, { cause });
    this._config = config;
  }

  get config() {
    return this._config;
  }

  set config(input: NumberTableGeneratorConfig) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property config is forbidden',
    });
  }
}
