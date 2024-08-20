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
    return this._select(`[id^="flowchart-${id}"]`);
  }

  getLabelOfNode(id: number) {
    return this._select(`[id^=flowchart-${id}] .nodeLabel`);
  }

  getEdgeBetween(args: Pick<IEdge, 'startNodeId' | 'endNodeId'>) {
    const { startNodeId, endNodeId } = args;
    return this._select(`[id^="L-${startNodeId}-${endNodeId}"]`);
  }

  getLabelOfEdge(id: number) {
    return this._select(`.edgeLabels > .edgeLabel:nth-child(${id + 1}) span`);
  }

  private _select(selector: string) {
    return this._graphRef?.current?.querySelector(selector) ?? null;
  }
}
