import { IGraphVisualizer } from '../interfaces/graph-visualizer';
import { GraphRenderDirection } from './graph-render-direction';

export type IGraphVisualizationBuilder = (args: {
  graphDirection: GraphRenderDirection;
}) => IGraphVisualizer;
