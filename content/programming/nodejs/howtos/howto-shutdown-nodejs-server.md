
+++

+++
# How To Shutdown a Node.js Server

1.  Subscribe to the 

    ```
    undefined
    ```

     event which provides the socket for each new connection.
2.  Remember each socket
3.  Once the 

    ```
    undefined
    ```

     is called, close each socket separately using 

    ```
    undefined
    ```

```js 
server.on('connection', socket => {
  sockets.push(socket);

  socket.on('close', () => {
    delete sockets[socketId];
  });
});
```

