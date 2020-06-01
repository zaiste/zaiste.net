
+++

+++
# How To Restart a Node.js Server

First, start a server

```js 
const server = http.createServer(...);
```

Use ```
undefined
``` to watch for file changes:

```js 
chokidar
  .watch('path/to/your/app/files')
  .on('change', path => {
    restart();
  });
```

In order to ```
undefined
``` a Node.js server, you must first shut it down by (1) \[\[file:howto-shutdown-nodejs-server.org]\[closing all sockets]] and (2) by closing the server itself.

```js 
server.close(() => {
  start();
})
```

Lastly, you need to clear the cache of the ```
undefined
``` function by deleting the keys corresponding to changed files.

```js 
delete require.cache[filePath];
```

