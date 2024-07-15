import { IEventEmitter } from '@algorithm-visualizer/event-handling-contract';

import { GraphCreatedEvent } from '../events';
import { GraphGeneratorConfig } from '../other/graph-generator-config';

export interface IGraphGenerator extends IEventEmitter<GraphCreatedEvent> {
  /**
   * Generates a random graph based on the specified GraphGeneratorConfig
   *
   * @param {GraphGeneratorConfig} config - A {@link GraphGeneratorConfig} object
   *
   * @throws GraphGeneratorError
   */
  generateGraph: (config: GraphGeneratorConfig) => void;
}
