import {
  IEdge,
  IGraphComponentSelector,
} from '@algorithm-visualizer/graph-contract';

export class GraphMermaidComponentSelector implements IGraphComponentSelector {
  private _graphRef: React.RefObject<HTMLDivElement> | null = null;

  constructor() {}

  setGraphReference(graphRef: React.RefObject<HTMLDivElement>) {
    this._graphRef = graphRef;
  }

  getNode(id: number) {
    return (
      this._graphRef?.current?.querySelector(`[id^="flowchart-${id}"]`) ?? null
    );
  }

  getLabelOfNode(id: number) {
    return (
      this._graphRef?.current?.querySelector(
        `[id^=flowchart-${id}] .nodeLabel`,
      ) ?? null
    );
  }

  getEdgeBetween(args: Pick<IEdge, 'startNodeId' | 'endNodeId'>) {
    const { startNodeId, endNodeId } = args;
    return (
      this._graphRef?.current?.querySelector(
        `[id^="L-${startNodeId}-${endNodeId}"]`,
      ) ?? null
    );
  }

  getLabelOfEdge(id: number) {
    return (
      this._graphRef?.current?.querySelector(
        `.edgeLabels > .edgeLabel:nth-child(${id}) span`,
      ) ?? null
    );
  }
}
