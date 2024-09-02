import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import { TableStructureEvent } from '@algorithm-visualizer/table-contract';

import { TableStructure } from './table-structure';

export function buildTableStructure<Data>() {
  const eventHandlerChain = new EventHandlerChain<TableStructureEvent<Data>>({
    abortAfterSuccess: true,
    validator: new FunctionValidator(),
  });
  return new TableStructure<Data>({ eventHandlerChain });
}
