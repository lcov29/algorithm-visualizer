import { IGraphVisualizer } from '@algorithm-visualizer/graph-contract';

import React, { JSX, useRef, useState } from 'react';

interface GraphViewProps {
  graphVisualizer: IGraphVisualizer;
}

export function GraphView({
  graphVisualizer,
}: GraphViewProps): JSX.Element | null {
  const [graphSVGString, setGraphSVGString] = useState<string>('');
  const graphRef = useRef<HTMLDivElement>(null);

  graphVisualizer.setGraphViewReferences(graphRef, setGraphSVGString);

  if (!graphSVGString) {
    return null;
  }

  return (
    <div
      className="graph-view"
      ref={graphRef}
      dangerouslySetInnerHTML={{ __html: graphSVGString }}
    />
  );
}
