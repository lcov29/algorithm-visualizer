import {
  GraphViewInitializedEvent,
  IEdge,
  INode,
  MermaidCurveStyle,
  MermaidFlowchartDirection,
} from '@algorithm-visualizer/graph-contract';

export interface IGraphMermaidDefinitionParser {
  parse: (event: GraphViewInitializedEvent) => string;
}

interface IGraphMermaidDefinitionParserArgs {
  curveStyle: MermaidCurveStyle;
  direction: MermaidFlowchartDirection;
}

export class GraphMermaidDefinitionParser
  implements IGraphMermaidDefinitionParser
{
  private _curveStyle: MermaidCurveStyle;
  private _direction: MermaidFlowchartDirection;

  constructor(args: IGraphMermaidDefinitionParserArgs) {
    this._curveStyle = args.curveStyle;
    this._direction = args.direction;
  }

  /**
   * Parses the specified graph into a valid mermaid flowchart definition.
   */
  parse(event: GraphViewInitializedEvent): string {
    const { nodes, edges } = event;
    return [
      `%%{ init: { "flowchart": { "curve": "${this._curveStyle}" } } }%%`,
      `flowchart ${this._direction}`,
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
