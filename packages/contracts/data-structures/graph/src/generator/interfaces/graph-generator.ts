import { IEventEmitter } from '@algorithm-visualizer/event-handling-contract';

import {
  GraphGeneratorConfig,
  GraphGeneratorGraphGeneratedEvent,
} from '../data-transfer-objects';

export interface IGraphGenerator
  extends IEventEmitter<GraphGeneratorGraphGeneratedEvent> {
  /**
   * Generates a random graph based on the specified GraphGeneratorConfig
   *
   * @param {GraphGeneratorConfig} config - A {@link GraphGeneratorConfig} object
   *
   * @throws GraphGeneratorError
   */
  generateGraph: (config: GraphGeneratorConfig) => void;
}
