export interface IGraphComponentSelector {
  getNode: (id: number) => Element | null;
  getLabelOfNode: (id: number) => Element | null;
  getEdge: (id: number) => Element | null;
  getEdgeBetween: (args: {
    startNodeId: number;
    endNodeId: number;
  }) => Element | null;
  getLabelOfEdge: (id: number) => Element | null;
  setGraphReference: (graphRef: React.RefObject<HTMLDivElement>) => void;
}
