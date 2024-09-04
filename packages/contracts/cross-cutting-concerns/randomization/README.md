# @algorithm-visualizer/randomization-contract

This contract package contains interfaces to decouple the consumer from the specific implementation of the `randomization` package.

```mermaid
flowchart RL
  A[Consumer]
  B[Randomization Contract]
  C[Randomization Implementation]
  A -- uses --> B
  C -- implements --> B
```

<br>

## Interfaces

- [`RandomBooleanGenerator`](./src/types/random-boolean-generator.ts)
- [`RandomIntegerGenerator`](./src/types/random-integer-generator.ts)
- [`RandomListItemSelector`](./src/types/random-list-item-selector.ts)
- [`RandomListShuffler`](./src/types/random-list-shuffler.ts)
