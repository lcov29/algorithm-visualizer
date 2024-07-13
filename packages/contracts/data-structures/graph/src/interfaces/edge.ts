/**
 * An edge of a {@link Graph} data structure
 */
export interface IEdge {
  id: number;
  startNodeId: number;
  endNodeId: number;
  isDirected?: boolean;
  weight?: number;
}
