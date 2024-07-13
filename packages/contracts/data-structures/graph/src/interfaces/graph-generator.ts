import { GraphGeneratorConfig } from '../other/graph-generator-config';
import { IGraph } from './graph';

/**
 * Generates a random graph based on the specified GraphGeneratorConfig
 *
 * @param {GraphGeneratorConfig} config - A {@link GraphGeneratorConfig} object
 *
 * @throws GraphGeneratorError
 */
export type IGraphGenerator = (config: GraphGeneratorConfig) => IGraph;
