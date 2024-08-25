export interface IGraphComponentSelector {
  getEdge: (id: number) => Element | null;
  getEdgeBetween: (args: {
    startNodeId: number;
    endNodeId: number;
  }) => Element | null;
  getEdgeLabel: (id: number) => Element | null;
  getNode: (id: number) => Element | null;
  getNodeLabel: (id: number) => Element | null;
  setGraphReference: (graphRef: React.RefObject<HTMLDivElement>) => void;
}
