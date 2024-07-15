import { IGraph } from './graph';
import { IGraphGenerator } from './graph-generator';
import { IGraphVisualizer } from './graph-visualizer';

export type IGraphBuilder = () => IGraph;
export type IGraphVisualizationBuilder = () => IGraphVisualizer;
export type IGraphGeneratorBuilder = () => IGraphGenerator;
