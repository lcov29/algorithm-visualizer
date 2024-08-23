import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphEvent } from '../../structure';

import React from 'react';

export interface IGraphVisualizer extends IEventSubscriber<GraphEvent> {
  setGraphViewReferences: (
    graphRef: React.RefObject<HTMLDivElement>,
    setGraphSVGString: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
}
