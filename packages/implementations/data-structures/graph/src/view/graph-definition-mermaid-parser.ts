import {
  GraphCreatedEvent,
  IEdge,
  INode,
} from '@algorithm-visualizer/graph-contract';

export class GraphDefinitionMermaidParser {
  /**
   * Parses the specified graph into a valid mermaid flowchart definition.
   */
  parse({ nodes, edges }: GraphCreatedEvent): string {
    return [
      '%%{ init: { flowchart: { curve: "linear" } } }%%',
      'flowchart LR',
      this._parseNodes(nodes.list),
      this._parseEdges(edges.list),
      '\n',
    ].join('\n');
  }

  private _parseNodes(nodes: INode[]) {
    return nodes
      .map(node => {
        const label = node.label === '' ? node.id : node.label;
        return `${node.id}((${label}))`;
      })
      .join('\n');
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
