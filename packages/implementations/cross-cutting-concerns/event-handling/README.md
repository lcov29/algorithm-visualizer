# @algorithm-visualizer/event-handling <!-- omit in toc -->

This utility package contains the following components to handle application events:

- [`EventHandlerChain`](#eventhandlerchain)
- [`EventSubscriberManager`](#eventsubscribermanager)

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

## `EventSubscriberManager` <!-- omit in toc -->

Encapsulates the managing of subscribers like adding, removing, clearing.

Event emitters can use this component to manage their subscribers and notify them about events.

<br>

```mermaid
flowchart LR
  A[Event Subscriber A]
  B[Event Emitter]
  C[EventSubscriberManager]
  A -- (1) subscribes / unsubscribe --> B
  B -- (1) add / remove subscriber --> C
  B -- (2) clear subscribers --> C
  B -- (3) dispatch event --> C
  C -- (3) dispatch event --> A
```
