+++
+++
# Transducers

It is adapted for situations where the imperative code (inside the `for` loop) is complex so that it is better to construct it using the functional approach.

In the context of the `for` loop, The time and space complexity (how much data is in memory at any given time) are straighforward; it's easy to pause and debug.

With functional combinators and recursion approaches, when the problem slightly changes, it may be needed to unfold the whole thing and re-fold it again to adapt the code.

Use transducers instead of the `for` loop to expose a library function which takes a transducer as input. It may be hard to refactor the `for` loop to allow someone consuming this function to specify additional things they want to aggregate due to an API changes; with transducers, it may be defined with an argument.

As there is more processing, transducers let you build each step in isolation and compose them easily.

Transducers in the Clojure sense often carry hidden mutable state.