import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';

import { GraphVisualizationEvent } from '../events';

import React from 'react';

export interface IGraphVisualizer
  extends IEventSubscriber<GraphVisualizationEvent> {
  setGraphViewValues: (
    ref: React.MutableRefObject<null>,
    fn: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
}
