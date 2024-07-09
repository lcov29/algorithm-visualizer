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
- [`IEventSubscriber`](./src/interfaces/event-subscriber.ts)
- [`IEventHandler`](./src/interfaces/event-handler.ts)
- [`IEventHandlerChain`](./src/interfaces/event-handler-chain.ts)

<br>

## Data Transfer Objects

- [`BaseEvent`](./src/other/base-event.ts)
