+++
title = "How To Shutdown a Node.js Server"
+++

1.  Subscribe to the `connection` event which provides the socket for each new connection.
2.  Remember each socket
3.  Once the `server.close()` is called, close each socket separately using `.destroy()`

```js
server.on('connection', socket => {
  sockets.push(socket);

  socket.on('close', () => {
    delete sockets[socketId];
  });
});
```

Node.js emits events when the process receives a signal. We can write a handler for these events.

```js
const onExitHandler = signal => {
  console.log(`Received ${signal}. Exiting...`)
  server.close(() => {
    process.exit(0);
  });
}
process.on('SIGINT', onExitHandler);
process.on('SIGQUIT', onExitHandler);
process.on('SIGTERM', onExitHandler);
```