import {
  GraphRenderEvent,
  IEdge,
  INode,
} from '@algorithm-visualizer/graph-contract';

import { MermaidGraphRenderDirection } from './graph-render-direction-map';

interface IGraphDefinitionMermaidParserArgs {
  event: GraphRenderEvent;
  graphRenderDirection: MermaidGraphRenderDirection;
}

export class GraphDefinitionMermaidParser {
  /**
   * Parses the specified graph into a valid mermaid flowchart definition.
   */
  parse({
    event,
    graphRenderDirection,
  }: IGraphDefinitionMermaidParserArgs): string {
    const { nodes, edges } = event;
    return [
      '%%{ init: { "flowchart": { "curve": "monotoneX" } } }%%',
      `flowchart ${graphRenderDirection}`,
      this._parseNodes(nodes),
      this._parseEdges(edges),
      '\n',
    ].join('\n');
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
