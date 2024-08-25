import { IGraphComponentSelector } from '@algorithm-visualizer/graph-contract';

export class GraphMermaidComponentSelector implements IGraphComponentSelector {
  private _graphRef: React.RefObject<HTMLDivElement> | null = null;

  constructor() {}

  setGraphReference(graphRef: React.RefObject<HTMLDivElement>) {
    this._graphRef = graphRef;
  }

  getNode(id: number) {
    return this._select(`[id^="flowchart-${id}"]`);
  }

  getNodeLabel(id: number) {
    return this._select(`[id^=flowchart-${id}] .nodeLabel`);
  }

  getEdge(id: number) {
    return this._select(`.edgePaths > [id$="-${id}"]`);
  }

  getEdgeLabel(id: number) {
    return this._select(`[id="edge-label-${id}"]`);
  }

  private _select(selector: string) {
    return this._graphRef?.current?.querySelector(selector) ?? null;
  }
}
