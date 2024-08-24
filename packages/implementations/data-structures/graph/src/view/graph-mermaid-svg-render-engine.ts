import {
  GraphRenderEvent,
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
   * Renders the graph specified by the {@link GraphRenderEvent} as a svg file using Mermaid.js ({@link https://mermaid.js.org/}).
   *
   * @param {GraphRenderEvent} GraphRenderEvent
   */
  async render(event: GraphRenderEvent): Promise<string> {
    const mermaidGraphDefinition = new GraphDefinitionMermaidParser().parse({
      event,
      graphRenderDirection: this._graphRenderDirection,
    });
    const { svg } = await mermaid.render('graph', mermaidGraphDefinition);
    return this._indexEdges(svg);
  }

  private _indexEdges(svgString: string) {
    // Mermaid renders the edge elements (path and label) without an id which satisfies our
    // need to address edge components by their zero-based edgeId that is used by the graph
    // edge events.
    // Since the ascending edgeId order of the edgeList of the graph is preserved by the
    // GraphDefinitionMermaidParser, we manipulate the svg string to include the edgeId
    // within the id attributes.
    const svgWithIndexedEdgeLabels = this._indexEdgeLabels(svgString);
    return this._indexEdgePaths(svgWithIndexedEdgeLabels);
  }

  private _indexEdgeLabels(svgString: string) {
    const edgeLabelRegEx = /<span class="edgeLabel">.*?<\/span>/g;
    const edgeLabels = svgString.match(edgeLabelRegEx) ?? [];

    edgeLabels.forEach((edgeLabel, index) => {
      const positionIndex = svgString.search(edgeLabel);
      const start = svgString.substring(0, positionIndex + 5);
      const end = svgString.substring(positionIndex + 6, svgString.length);
      svgString = `${start} id="edge-label-${index}" ${end}`;
    });

    return svgString;
  }

  private _indexEdgePaths(svgString: string) {
    const edgePathIdRegEx = /id="L-.*?"/g;
    const edgePaths = svgString.match(edgePathIdRegEx) ?? [];

    edgePaths.forEach((pathId, index) => {
      svgString = svgString.replace(
        pathId,
        `${pathId.substring(0, pathId.length - 1)}-${index}"`,
      );
    });

    return svgString;
  }
}
