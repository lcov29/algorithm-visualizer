import {
  GraphCreatedEvent,
  IGraphSVGRenderEngine,
} from '@algorithm-visualizer/graph-contract';

import { GraphDefinitionMermaidParser } from './graph-definition-mermaid-parser';
import { MermaidGraphRenderDirection } from './graph-render-direction-map';

import mermaid from 'mermaid';

export class GraphMermaidSVGRenderEngine
  implements IGraphSVGRenderEngine<string>
{
  private _graphRenderDirection: MermaidGraphRenderDirection;

  constructor(graphRenderDirection: MermaidGraphRenderDirection) {
    this._graphRenderDirection = graphRenderDirection;
  }

  /**
   * Renders the graph specified by the {@link GraphCreatedEvent} to a svg file using Mermaid.js ({@link https://mermaid.js.org/}).
   *
   * @param {GraphCreatedEvent} GraphCreatedEvent
   */
  async render(event: GraphCreatedEvent): Promise<string> {
    const mermaidGraphDefinition = new GraphDefinitionMermaidParser().parse({
      event,
      graphRenderDirection: this._graphRenderDirection,
    });
    const { svg } = await mermaid.render('graph', mermaidGraphDefinition);
    return svg;
  }
}
