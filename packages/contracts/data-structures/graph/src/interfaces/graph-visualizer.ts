import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphVisualizationEvent } from '../events';

import React from 'react';

export interface IGraphVisualizer
  extends IEventSubscriber<GraphVisualizationEvent> {
  setGraphViewReferences: (
    graphRef: React.RefObject<HTMLDivElement>,
    setGraphSVGString: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
}
