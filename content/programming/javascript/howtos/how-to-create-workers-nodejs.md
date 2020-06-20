+++
title = "How To Create Workers in Node.js 11+"
[taxonomies]
topics = [ "Node.js", "JavaScript" ]
+++

```js
const { Worker } = require('worker_threads');

let threadStatus = [...Array(numberOfThreads)].fill(0);

for (let i = 0; i < numberOfThreads; i++) {
  const worker = new Worker(require.resolve('<path to worker>'), {
    workerData: { ... }
  })

  worker.on("message", data => handleData(...))
  worker.on("error", error => handleError(...))
  worker.on("exit", statusCode => ...)
}

```

Worker:

```js
const { parentPort, workerData } = require('worker_threads');

const { ... } = workerData;

(async () => {
  ... // computation

  parentPort.postMessage(...) // send to the parent
})();
```

