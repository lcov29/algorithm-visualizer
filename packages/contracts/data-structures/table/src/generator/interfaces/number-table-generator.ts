import { IEventEmitter } from '@algorithm-visualizer/event-handling-contract';

import {
  NumberTableGeneratorConfig,
  TableGeneratedEvent,
} from '../data-transfer-objects';

export interface INumberTableGenerator
  extends IEventEmitter<TableGeneratedEvent<number>> {
  /**
   * Generates a random table based on the specified TableGeneratorConfig
   *
   * @param {NumberTableGeneratorConfig} config - A {@link NumberTableGeneratorConfig} object
   *
   * @throws GraphGeneratorError
   */
  generateTable: (config: NumberTableGeneratorConfig) => void;
}
