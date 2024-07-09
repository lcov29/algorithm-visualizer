# @algorithm-visualizer/graph

This package contains the graph data structure and related functionalities.

<br>
<br>

## Structure <!-- omit in toc -->

This directory contains all classes used to implement the graph data structure itself.
The `Graph` instance is a composite object and can be modified by [graph events](#events).

<br>

**Base Class Diagram**

```mermaid
flowchart TB
  A[BaseList]
  B[NodeList]
  C[EdgeList]
  D[EventHandlerChain]
  E[Graph]
  E -. use .-> B & C & D
  B & C -- extends --> A
```

<br>

**Graph Class**

```mermaid
classDiagram
  direction BT
  class Graph {
    get nodes() INode[]
    get edges() IEdge[]
    handleEvent(event: GraphEvent)
  }
```

<br>
<br>

## Generator <!-- omit in toc -->

This directory contains the implementation of a random graph generator.

```mermaid
flowchart LR
  A[GraphConfiguration]
  B["generateGraph()"]
  C[Graph]
  A -- passed to --> B
  B -- returns --> C
```
