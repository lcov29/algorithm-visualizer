import { GraphGeneratorConfig } from '../other/graph-generator-config';
import { IGraph } from './graph';

export type IGraphGenerator = (config: GraphGeneratorConfig) => IGraph;
