import {
  GraphViewInitializedEvent,
  GraphVisualizationError,
  IGraphRenderer,
  MermaidCurveStyle,
  MermaidFlowchartDirection,
} from '@algorithm-visualizer/graph-contract';

import { GraphMermaid } from './graph-mermaid';
import { GraphMermaidDefinitionParser } from './graph-mermaid-definition-parser';

import mermaid from 'mermaid';
import React from 'react';

interface IGraphMermaidRendererArgs {
  curveStyle: MermaidCurveStyle;
  direction: MermaidFlowchartDirection;
}

export class GraphMermaidRenderer implements IGraphRenderer {
  private _graphRef: React.RefObject<HTMLDivElement> | null;
  private _mermaidDefinitionParser: GraphMermaidDefinitionParser;

  constructor(args: IGraphMermaidRendererArgs) {
    this._graphRef = null;
    this._mermaidDefinitionParser = new GraphMermaidDefinitionParser(args);
  }

  /**
   * Renders the graph specified by the passed mermaid graph definition to a svg file.
   */
  async render(event: GraphViewInitializedEvent) {
    if (!this._graphRef) {
      throw new GraphVisualizationError({
        message:
          'Failed to render the mermaid graph, because the GraphMermaidRenderer.render() was called without initializing the graphRef.',
      });
    }

    const graphDefinition = this._mermaidDefinitionParser.parse(event);
    const { svg } = await mermaid.render('graph', graphDefinition);
    const indexedSVG = this._indexEdges(svg);
    return <GraphMermaid svgString={indexedSVG} graphRef={this._graphRef} />;
  }

  setGraphReference(graphRef: React.RefObject<HTMLDivElement>) {
    this._graphRef = graphRef;
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
    const edgeLabelSpanRegEx = /<span class="edgeLabel">.*?<\/span>/g;
    const edgeLabelSpans = svgString.match(edgeLabelSpanRegEx) ?? [];

    edgeLabelSpans.forEach((edgeLabelSpan, index) => {
      const spanPosition = svgString.search(edgeLabelSpan);
      const insertPosition = spanPosition + '<span'.length;

      const start = svgString.substring(0, insertPosition);
      const end = svgString.substring(insertPosition + 1, svgString.length);
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
