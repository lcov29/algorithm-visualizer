/**
 * An edge of a {@link Graph} data structure
 */
export interface IGraphStructureEdge {
  id: number;
  startNodeId: number;
  endNodeId: number;
  isDirected?: boolean;
  weight?: number;
}
