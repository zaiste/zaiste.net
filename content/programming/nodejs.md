+++
title = "Node.js"
[extra]
howtos = true
+++

Node.js is an open source runtime built on Chrome's V8 JavaScript engine for creating both server-side apps, as well as JavaScript code run outside of the browser environment, e.g. command-line tools.

It has gained massive adoption maybe because of it's efficient, event-driven and non-blocking I/O model.

Since threads share the same memory space, creating new ones do not take up additional system resources.

Processes run as separate memory allocations.

Internal, async operations (e.e. I/O) are multi-threaded while user application runs in a single thread.

## HowTos

### [How To Shutdown a Node.js Server](@/programming/nodejs/howtos/howto-shutdown-nodejs-server.md)

### [How To Restart a Node.js Server](@/programming/nodejs/howtos/howto-restart-nodejs-server.md)

## Event Emitter

`EventEmitter` is a module that allows communication between objects. It can be
considered as the core of Node asynchronous event-driven architecture as many
internal objects are instances of `EventEmitter` class e.g. HTTP requests,
responses, and streams. In general, all objects that emit events are instances
of the `EventEmitter` class.

## Buffer

Bus Station Metaphore: at some bus stations, a bus is not allowed to depart until a certain amount of passengers arrive or until a specific departure time. The passengers may arrive at different times with different speed. Neither the passengers nor the bus station has control over passengers’ arrival at the station.

```js
const buffer1 = Buffer.alloc(10); // 10 bytes.
buffer1.toJSON() // { type: 'Buffer', data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] }

buffer1.write("Buffers, buffers, buffers!");
buffer1.toString()

const buffer2 = Buffer.from("Hello, World!");
```

## Exceptions

From Node.js 7, unhandled promise rejections are automatically shown in console.

## Event Loop

A Node.js application runs on a single thread. In this thread an event loop listens for events and executes callback functions associated with particular events.

Heavy, CPU intesive tasks block the event loop, causing the application to freeze.

## Cluster

The `cluster` module allows to spawn multiple child processes that share a port.