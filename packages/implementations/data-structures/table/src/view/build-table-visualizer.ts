import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import { TableViewEvent } from '@algorithm-visualizer/table-contract';

import { TableViewModel } from './table-view-model';
import { TableVisualizer } from './table-visualizer';

export function buildTableVisualizer() {
  const eventHandlerChain = new EventHandlerChain<TableViewEvent>({
    abortAfterSuccess: true,
    validator: new FunctionValidator(),
  });

  return new TableVisualizer({
    eventHandlerChain,
    model: new TableViewModel(),
  });
}
