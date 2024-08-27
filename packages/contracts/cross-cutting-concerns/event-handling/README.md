# @algorithm-visualizer/event-handling-contract

This contract package contains interfaces and data transfer objects to decouple the consumer from the specific implementation of the `event-handling` package.

```mermaid
flowchart RL
  A[Consumer]
  B[Event Handling Contract]
  C[Event Handling Implementation]
  A -- uses --> B
  C -- implements --> B
```

<br>

## Interfaces

- [`IEventEmitter`](./src/interfaces/event-emitter.ts)
- [`IEventHandlerChain`](./src/interfaces/event-handler-chain.ts)
- [`IEventHandler`](./src/interfaces/event-handler.ts)
- [`IEventSubscriberManager`](./src/interfaces/event-subscriber-manager.ts)
- [`IEventSubscriber`](./src/interfaces/event-subscriber.ts)

<br>

## Data Transfer Objects

- [`BaseEvent`](./src/data-transfer-objects/base-event.ts)
- [`EventHandlingError`](./src/data-transfer-objects/event-handling-error.ts)
