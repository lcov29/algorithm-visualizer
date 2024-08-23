import { IGraphVisualizer } from '../interfaces/graph-visualizer';
import { GraphRenderDirection } from './graph-render-direction';

export type GraphVisualizationBuilder = (args: {
  graphDirection: GraphRenderDirection;
}) => IGraphVisualizer;
