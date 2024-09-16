export interface IGraphViewEdge {
  id: number;
  startNodeId: number;
  endNodeId: number;
  isDirected?: boolean;
  weight?: number;
}
