import { GraphCreatedEvent, IEdge } from '@algorithm-visualizer/graph-contract';

import { MermaidGraphRenderDirection } from './graph-render-direction-map';

interface IGraphDefinitionMermaidParserArgs {
  event: GraphCreatedEvent;
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
      this._parseNodes(nodes.nodeIds),
      this._parseEdges(edges.edges),
      '\n',
    ].join('\n');
  }

  private _parseNodes(nodes: number[]) {
    return nodes.map(id => `${id}((${id}))`).join('\n');
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
