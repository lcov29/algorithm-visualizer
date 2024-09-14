import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphViewEvent } from '../types';

import React from 'react';

export interface IGraphVisualizer extends IEventSubscriber<GraphViewEvent> {
  setGraphViewReferences: (
    graphRef: React.RefObject<HTMLDivElement>,
    setGraphSVGString: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
  ) => void;
}
