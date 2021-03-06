
+++

+++
# Pony

[Pony](https://www.ponylang.io/) is ahead-of-time (AOT) compiled, actor-model, object-oriented, capabilities-secure, high-performance programming language. It is type, memory (no pointers, no `null` concept, no buffer overruns) and exception safe (no runtime exceptions). It is also impossible to have deadlocks in Pony.

Pony was designed to have the same operational semantics whether it is running in a concurrent or distributed context. The type system uses reference capabilities which makes the language data-race free

Pony has unidirectional message passing. Actors can independently garbage collect without needing to stop everything. This provides a performance advantage because there is no global stop-the-world pause. Actors allow to zero-copy message passing between them without involving distributed garbage collection.

Pony has two different queue implementations;

-   multi-producer / single-consumer: used to send messages to an actor.
-   single-producer / multi-consumer: used to implement the schedulers.

The schedulers are typically bound to cores (either one per physical core or one per logical core). Each core is running a single scheduler thread, which has a single-producer, multi-consumer queue.

Using immutable data is preferred. Data can be also passed between actors for mutation. Additionally, lambdas can be send to actors to be run on its local state.

