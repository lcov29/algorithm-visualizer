import { IGraphVisualizer } from '@algorithm-visualizer/graph-contract';

import React, { JSX, useRef, useState } from 'react';

interface IGraphViewProps {
  graphVisualizer: IGraphVisualizer;
}

export function GraphView({
  graphVisualizer,
}: IGraphViewProps): JSX.Element | null {
  const [graph, setGraph] = useState<JSX.Element | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  graphVisualizer.setGraphViewReferences(graphRef, setGraph);

  return <div className="graph-view">{graph}</div>;
}
