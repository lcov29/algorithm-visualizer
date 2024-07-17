import { IGraph } from './graph';
import { IGraphGenerator } from './graph-generator';
import { GraphRenderDirection } from './graph-render-direction';
import { IGraphVisualizer } from './graph-visualizer';

export type IGraphBuilder = () => IGraph;
export type IGraphVisualizationBuilder = (args: {
  graphDirection: GraphRenderDirection;
}) => IGraphVisualizer;
export type IGraphGeneratorBuilder = () => IGraphGenerator;
