import { BaseEvent } from '../data-transfer-objects';

export interface IEventSubscriber {
  handleEvent: (event: BaseEvent<string>) => Promise<void>;
}
