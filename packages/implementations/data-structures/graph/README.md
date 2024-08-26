# @algorithm-visualizer/graph

This package contains the graph data structure and related functionalities.

<br>
<br>
<br>

## Structure

This directory contains all classes used to implement the graph data structure itself.
The `Graph` instance is a composite object and can be modified by [graph events](../../../contracts/data-structures/graph/README.md#events).

<br>
<br>

```mermaid
flowchart TB
  A[Graph]
  B[NodeList]
  C[EdgeList]
  D[EventHandlerChain]
  A -. use .-> B & C & D
```

<br>
<br>
<br>

## Generator

This directory contains the implementation of the random graph generator.

It creates a random graph based on a passed [`GraphGeneratorConfig`](../../../contracts/data-structures/graph/src/other/graph-generator-config.ts) and dispatches a [`GraphCreatedEvent`](../../../contracts//data-structures/graph/src/events/graph-created-event.ts) to all its subscribers.

<br>
<br>

**Class Overview**

```mermaid
flowchart LR
  A[GraphGenerator]
  B[NodeGenerator]
  C[EdgeGenerator]
  D[EventSubscriberManager]
  E[NodeList]
  F[EdgeList]
  G[GraphCreatedEvent]
  A -. use .-> B & C & D
  B -- generates --> E
  C -- generates --> F
  E & F -. used by .-> G
```

<br>
<br>

**Graph Generation Overview**

```mermaid
flowchart TB
  A[GraphConfiguration]
  B[GraphGenerator]
  C[NodeGenerator]
  D[NodeList]
  E[EdgeGenerator]
  F[EdgeList]
  G[GraphCreatedEvent]
  H[EventSubscriberManager]
  I[EventSubscriberA]
  J[EventSubscriberB]
  A -- passed to --> B
  subgraph " "
    B -- (1) calls --> C
    C -- generates --> D
    B -- (2) calls --> E
    D -- passed to --> E
    E -- generates --> F
    B -- (3) creates --> G
    D & F -- passed to --> G
    B -- (4) notify --> H
    G -- passed to --> H
  end
  H -- forward event to --> I & J
```

<br>
<br>
<br>

## View

This directory contains all classes used to visualize a given graph.

It visualizes the graph based on a passed [`GraphRenderedEvent`](../../../contracts/data-structures/graph/src/view/data-transfer-objects/events/graph-rendered-event.ts) and can be modified by a set of defined [`GraphViewEvents`](../../../contracts/data-structures/graph/README.md#events-1).

<br>
<br>

**Class Overview**

```mermaid
flowchart LR
  A[GraphView.tsx]
  B[GraphVisualizer]
  C[EventHandlerChain]
  D[GraphMermaidDefinitionParser]
  E[GraphMermaidSVGRenderEngine]
  F[GraphMermaidComponentSelector]
  B -. uses .-> C & D & E & F
  B  & F -- references --> A
```

<br>
<br>

**Graph Render Process Overview**

```mermaid
flowchart TB
  A[GraphRenderEvent]
  B[GraphVisualizer]
  C[GraphMermaidDefinitionParser]
  D(MermaidGraphDefinition)
  E[GraphMermaidSVGRenderEngine]
  F(MermaidGraphSVG)
  G[ReactGraphView]
  A -- passed to --> B
  subgraph " "
    B -- redirects event to --> C
    C -- generates --> D
    D -- passed to --> E
    E -- generates --> F
  end
  F -- passed to --> G
```

<br>
<br>

**Graph Manipulation Process Overview**

```mermaid
flowchart TB
  A[GraphManipulationEvent]
  B[GraphVisualizer]
  C[GraphMermaidComponentSelector]
  E[ReactGraphView]
  A -- passed to --> B
  subgraph " "
    B -- redirects event to --> C
  end
    C -- manipulates --> E
```
