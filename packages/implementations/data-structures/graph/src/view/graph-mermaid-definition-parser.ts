import {
  GraphRenderDirection,
  GraphRenderedEvent,
  IEdge,
  INode,
} from '@algorithm-visualizer/graph-contract';

type MermaidGraphRenderDirection = 'LR' | 'RL' | 'TB' | 'BT';

export interface IGraphDefinitionParser {
  parse: (event: GraphRenderedEvent) => string;
}

export class GraphMermaidDefinitionParser implements IGraphDefinitionParser {
  private _mermaidRenderDirectionMap: Map<
    GraphRenderDirection,
    MermaidGraphRenderDirection
  >;

  constructor() {
    this._mermaidRenderDirectionMap = new Map<
      GraphRenderDirection,
      MermaidGraphRenderDirection
    >([
      ['Left-To-Right', 'LR'],
      ['Right-To-Left', 'RL'],
      ['Top-To-Bottom', 'TB'],
      ['Bottom-To-Top', 'BT'],
    ]);
  }

  /**
   * Parses the specified graph into a valid mermaid flowchart definition.
   */
  parse(event: GraphRenderedEvent): string {
    const { nodes, edges, renderDirection } = event;
    return [
      '%%{ init: { "flowchart": { "curve": "monotoneX" } } }%%',
      `flowchart ${this._parseRenderDirection(renderDirection)}`,
      this._parseNodes(nodes),
      this._parseEdges(edges),
      '\n',
    ].join('\n');
  }

  private _parseRenderDirection(direction: GraphRenderDirection) {
    return this._mermaidRenderDirectionMap.get(direction);
  }

  private _parseNodes(nodes: INode[]) {
    return nodes.map(({ id, label }) => `${id}((${label}))`).join('\n');
  }

  private _parseEdges(edges: IEdge[]) {
    return edges
      .map(edge => {
        const { startNodeId, endNodeId, isDirected, weight } = edge;
        const arrowCharacter = isDirected ? '>' : '-';

        if (weight) {
          return `${startNodeId} -- ${weight} --${arrowCharacter} ${endNodeId}`;
        }
        return `${startNodeId} --${arrowCharacter} ${endNodeId}`;
      })
      .join('\n');
  }
}
