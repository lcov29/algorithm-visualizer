import './graph-mermaid.css';

import React, { JSX } from 'react';

interface IGraphMermaidProps {
  svgString: string;
  graphRef: React.RefObject<HTMLDivElement>;
}

export function GraphMermaid(args: IGraphMermaidProps): JSX.Element | null {
  const { svgString, graphRef } = args;

  return (
    <div
      className="graph-mermaid-view"
      ref={graphRef}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}
