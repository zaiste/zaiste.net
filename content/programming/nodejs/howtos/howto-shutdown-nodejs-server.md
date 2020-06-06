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

