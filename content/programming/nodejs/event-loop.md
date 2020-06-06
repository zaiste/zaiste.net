+++
+++

# The Event Loop

IO is usually the slowest operation in a process execution, e.g. network latency, user input awaiting, disk operations, etc. Having a thread waiting for each such operation is not optimal, thus blocking IO is wasteful.

In Node.js, blocking happens when the execution of additional JavaScript must wait until a non-JavaScript operation (i.e. an IO operation) completes.

In Node.js, the event loop is allowed to take care of some operations while there is an IO operation occuring.

In non-blocking IO the program only triggers an IO opertion, i.e. it returns right away without waiting for the result of this (asynchronous) operation.

The event loop is the mechanism where a single thread executes no only JavaScript, but it also handles timers and IO. There are iterations. In each iteration there are phases such as the timer phase (it executes callbacks scheduled by `setTimeout` and `setInterval`) or the IO phase.

The event loop also has a worker pool with workers that are used to interact with external APIs, e.g. the filesystem operations.

The event loop in Node.js implements the [Reactor pattern](https://en.wikipedia.org/wiki/Reactor_pattern).

