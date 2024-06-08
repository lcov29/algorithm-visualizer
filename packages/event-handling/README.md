# @algorithm-visualizer/event-handling <!-- omit in toc -->

This utility package contains the following components to handle application events:

- [`BaseEvent`](./src/base-event.ts)
- [`EventHandler`](./src/event-handler.d.ts)
- [`EventHandlerChain`](./src/event-handler-chain.ts)
- [`EventSubscriber`](./src/event-subscriber.d.ts)

<br>
<br>

## `BaseEvent` <!-- omit in toc -->

Base class for events emitted by other packages.

<br>
<br>

## `EventHandler` <!-- omit in toc -->

Interface specifying an event handler.

<br>
<br>

## `EventHandlerChain` <!-- omit in toc -->

Passes an event through a chain of event handlers.

It can be configured to abort after the first successful handler that is responsible for the passed event.

<br>

```mermaid
flowchart LR
  A(EventHandlerChain)
  B(EventHandler 1)
  C(EventHandler 2)
  D(...)
  A --> B --> C --> D
```

<br>
<br>

## `EventSubscriber` <!-- omit in toc -->

Interfaces to implement the event subscription mechanism ([observer pattern](https://en.wikipedia.org/wiki/Observer_pattern)) that allows subscriber components to get notified about events emitted by another component.

<br>

```mermaid
classDiagram
  direction LR
  class EventEmitter {
    subscribers: EventSubscriber[]
    +subscribe(subscriber: EventSubscriber)
    +unsubscribe(subscriber: EventSubscriber)
    +notifySubscribers()
  }
  class EventSubscriber {
    +handleEvent(event: Event)
  }
  EventEmitter "m" --> "n" EventSubscriber
```
