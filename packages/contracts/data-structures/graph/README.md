# @algorithm-visualizer/graph-contract

This contract package contains interfaces and data transfer objects to decouple the consumer from the specific implementation of the `graph` package.

```mermaid
flowchart RL
  A[Consumer]
  B[Graph Contract]
  C[Graph Implementation]
  A -- uses --> B
  C -- implements --> B
```

<br>

## Interfaces

- [`IGraphGenerator`](./src/interfaces/graph-generator.ts)
- [`IGraph`](./src/interfaces/graph.ts)
- [`IEdge`](./src/interfaces/edge.ts)
- [`INode`](./src/interfaces/node.ts)

<br>

## Data Transfer Objects

<br>

### Events

- [`EdgeAddedEvent`](./src/events/edge-added-event.ts)
- [`EdgeDeletedEvent`](./src/events/edge-deleted-event.ts)
- [`EdgeWeightChangedEvent`](./src/events/edge-weight-changed-event.ts)
- [`NodeAddedEvent`](./src/events/node-added-event.ts)
- [`NodeDeletedEvent`](./src/events/node-deleted-event.ts)
- [`NodeLabelChangedEvent`](./src/events/node-label-changed-event.ts)

<br>

### Other

- [`GraphGeneratorConfig`](./src/other/graph-generator-config.ts)
