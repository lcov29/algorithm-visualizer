import { IEventEmitter } from '@algorithm-visualizer/event-handling-contract';

import { GraphGeneratorConfig } from '../data-transfer-objects';

export interface IGraphGenerator extends IEventEmitter {
  /**
   * Generates a random graph based on the specified GraphGeneratorConfig
   *
   * @param {GraphGeneratorConfig} config - A {@link GraphGeneratorConfig} object
   *
   * @throws GraphGeneratorError
   */
  generateGraph: (config: GraphGeneratorConfig) => void;
}
