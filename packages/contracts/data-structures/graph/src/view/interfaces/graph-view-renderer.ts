import { GraphViewInitializedEvent } from '../data-transfer-objects';

import { JSX } from 'react';

export interface IGraphViewRenderer {
  render: (event: GraphViewInitializedEvent) => Promise<JSX.Element>;
  setGraphReference: (graphRef: React.RefObject<HTMLDivElement>) => void;
}
