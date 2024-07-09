export interface IEdge {
  id: number;
  startNodeId: number;
  endNodeId: number;
  isDirected?: boolean;
  weight?: number;
}
