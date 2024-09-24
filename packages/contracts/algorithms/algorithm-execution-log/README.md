# @algorithm-visualizer/algorithm-execution-log-contract

This contract package contains interfaces and data transfer objects to decouple the consumer from the specific implementation of the `algorithm-execution-log` package.

```mermaid
flowchart RL
  A[Consumer]
  B[Algorithm Execution Log Contract]
  C[Algorithm Execution Log Implementation]
  A -- uses --> B
  C -- implements --> B
```
